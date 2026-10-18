# Yasir Hassan · Portfolio

Personal portfolio site. Hand-coded in HTML, CSS and vanilla JavaScript, with no frameworks, no build step and no trackers.

## Structure

```
index.html              Home page: hero, work, experience, skills, writeups, contact
writeups/               Articles, listing page and RSS feed
css/style.css           Design tokens (dark/light themes), layout and components
css/post.css            Article and listing typography
js/main.js              Home page: command palette, theme, contact form, navigation
js/page.js              Writeup pages: theme, code copy buttons
js/analytics.js         GoatCounter loader (off until a site code is set)
assets/                 Photo, images, icons, share image and résumé PDF
CNAME                   Custom domain for GitHub Pages
.well-known/            security.txt
```

## Configuration

| What | Where | Value |
|---|---|---|
| Contact form | `index.html`, `data-endpoint` on `#contactForm` | Formspree URL, e.g. `https://formspree.io/f/abcdwxyz`. Empty = opens the visitor's email app |
| Analytics | `js/analytics.js`, `GOATCOUNTER_CODE` | GoatCounter site code. Empty = off |

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510.

## Deploy

Hosted on GitHub Pages from the `main` branch with the custom domain in `CNAME`.
DNS for `yasirhassan.tech`:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | yasirhassan-sec.github.io |
