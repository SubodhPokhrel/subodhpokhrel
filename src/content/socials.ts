import type { SocialLink } from "@/types";

/**
 * PLACEHOLDER handles/links (except GitHub). Replace with Subodh's real
 * profiles and WhatsApp number, and drop a WeChat QR image at
 * /public/images/wechat-qr.png (WeChat has no clickable web deep-link).
 */
export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SubodhPokhrel",
    handle: "@SubodhPokhrel",
    kind: "link",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/subodhpokhrel",
    handle: "in/subodhpokhrel",
    kind: "link",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/",
    handle: "@subodh",
    kind: "link",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/",
    handle: "Subodh Pokhrel",
    kind: "link",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/0000000000",
    handle: "Chat",
    kind: "link",
  },
  {
    id: "wechat",
    label: "WeChat",
    href: "#wechat",
    handle: "Available on request",
    kind: "qr",
    qrSrc: "/images/wechat-qr.png",
  },
];
