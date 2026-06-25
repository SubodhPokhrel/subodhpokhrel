# CONTENT STYLE ("text type")

How copy is written across the site. Content lives in `src/content/*`, never
hardcoded in components.

## Voice

- Confident, warm, precise. A maker who sweats the details — not a salesperson.
- First person ("I design and build…"), present tense.
- Short sentences. Concrete nouns. Cut adjectives that don't earn their place.

## Mechanics

- **Sentence case** for headings and buttons ("Get in touch", not "Get In Touch"),
  except proper nouns and the name "Subodh Pokhrel".
- One idea per line in the hero; let whitespace carry weight.
- Numbers as numerals (5 sites, 3 years).
- Oxford comma. No exclamation marks in body copy.
- CTAs are verbs: "View work", "Start a project", "Get in touch".

## Do / Don't

| Do                                             | Don't                                 |
| ---------------------------------------------- | ------------------------------------- |
| "Designer & developer."                        | "Ninja/rockstar/guru."                |
| "Fast, refined digital products."              | "Cutting-edge synergistic solutions." |
| Name the craft (UI/UX, motion, frontend).      | Buzzword soup.                        |
| Mark unfinished copy with `placeholder: true`. | Ship lorem ipsum silently.            |

## Hard rules

- **No brand names** in copy (no product/company names used as adjectives for the
  look & feel — the accent is "aurora").
- Every external link opens in a new tab with `rel="noopener noreferrer"`.
- Keep placeholder copy clearly flagged (`placeholder: true` and/or a `PLACEHOLDER`
  comment) until Subodh provides the final wording.
- Accessibility copy counts: meaningful `alt`, descriptive link text (never
  "click here").
