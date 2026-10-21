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
js/terminal.js          Home page: terminal easter egg (press `)
tools/og-image.html     Template for the writeup share images
js/analytics.js         GoatCounter loader (off until a site code is set)
projects/               Case-study pages with architecture diagrams
css/case-study.css      Case-study layout and diagram styles
css/fonts.css           Self-hosted Geist font faces
assets/                 Photo, images, icons, share image and résumé PDF
CNAME                   Custom domain for GitHub Pages
.well-known/            security.txt
```

## Configuration

| What | Where | Value |
|---|---|---|
| Contact form | `index.html`, `data-endpoint` on `#contactForm` | Formspree URL, e.g. `https://formspree.io/f/abcdwxyz`. Empty = opens the visitor's email app |
| Analytics | `js/analytics.js`, `GOATCOUNTER_CODE` | GoatCounter site code. Empty = off |

## Share images

Each writeup has its own 1200 x 630 share image in `assets/og-<slug>.png`, made from `tools/og-image.html`.
For a new writeup, run the local server below, then render the template with headless Edge or Chrome:

```bash
msedge --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 --screenshot=assets/og-my-post.png "http://localhost:5510/tools/og-image.html?kicker=Writeup%20%C2%B7%20Topic%20%C2%B7%205%20min%20read&title=Post%20title&desc=One-line%20summary&path=/writeups/&motif=chain"
```

`motif` is `chain` (hash chain) or `detect` (camera detections); leave it out for none.
Then point the writeup's `og:image`, `twitter:image` and JSON-LD `image` at the new file.

## Terminal

Press `` ` `` on the home page (or use the footer link or Ctrl K → Open terminal). Commands live in `js/terminal.js`.

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
