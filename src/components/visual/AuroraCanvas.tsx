"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { AuroraFallback } from "./AuroraFallback";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}`;

const FRAG = `precision highp float;
uniform vec2 u_res;uniform float u_time;
vec3 c1=vec3(0.49,0.43,0.86);
vec3 c2=vec3(0.66,0.46,0.86);
vec3 c3=vec3(0.40,0.74,0.90);
vec3 c4=vec3(0.92,0.55,0.78);
float hash(vec2 x){return fract(sin(dot(x,vec2(12.9898,78.233)))*43758.5453);}
float noise(vec2 x){vec2 i=floor(x),f=fract(x);float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));vec2 u=f*f*(3.0-2.0*f);return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;}
float fbm(vec2 x){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(x);x*=2.0;a*=0.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  vec2 q=uv*1.6;
  float t=u_time*0.04;
  float n1=fbm(q+vec2(t,t*0.6));
  float n2=fbm(q*1.3+vec2(-t*0.7,t)+n1);
  vec3 col=mix(c1,c2,smoothstep(0.2,0.8,n1));
  col=mix(col,c3,smoothstep(0.3,0.9,n2));
  col=mix(col,c4,smoothstep(0.5,1.0,n1*n2));
  float d=distance(uv,vec2(0.5,0.45));
  float glow=smoothstep(0.95,0.15,d);
  float alpha=glow*(0.30+0.18*n2);
  gl_FragColor=vec4(col,alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface AuroraCanvasProps {
  className?: string;
}

/** Animated WebGL aurora — a flowing fbm gradient mapped to the aurora palette. */
export function AuroraCanvas({ className }: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    let needsResize = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    let raf = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    observer.observe(canvas);

    // Only re-measure on an actual resize, not every frame.
    const onResize = () => {
      needsResize = true;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Fall back to the CSS aurora if the GPU context is lost (mobile reclaim, driver reset).
    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const start = performance.now();
    const render = (now: number) => {
      if (visible) {
        if (needsResize) {
          resize();
          needsResize = false;
        }
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  if (failed) return <AuroraFallback className={className} />;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
