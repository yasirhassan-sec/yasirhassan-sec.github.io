# Yasir Hassan · Portfolio

**Live site: [yasirhassan.tech](https://yasirhassan.tech)**

Personal portfolio of Yasir Hassan, a Computer Engineering student at Bahria University, Islamabad, working across cybersecurity, AI and software engineering.
Hand-coded in HTML, CSS and vanilla JavaScript, with no frameworks, no build step and no trackers.

## What's on the site

- **Home page:** hero with highlights, selected work, experience timeline, how I work, skills, writeups and a contact form.
- **Projects:** VigiLense (AI surveillance), NetGuard (network vulnerability scanner), Milkiyat (tamper-evident land records), Dastarkhwan (restaurant platform), HRMS and Enterprise Network. VigiLense, Milkiyat and Dastarkhwan have full case-study pages with architecture diagrams.
- **Writeups:** articles with their own share images, a listing page and an RSS feed.
- **Security page:** responsible-disclosure policy and how the site is protected, backed by `/.well-known/security.txt` (RFC 9116).
- **Extras:** a command palette (Ctrl K), a terminal easter egg (press `` ` ``), light and dark themes, and a live local-time clock in the footer.

## Structure

```
index.html              Home page
projects/               Case-study pages (VigiLense, Milkiyat, Dastarkhwan)
writeups/               Articles, listing page and RSS feed (feed.xml)
security/               Security and responsible-disclosure page
404.html                Not-found page
css/style.css           Design tokens (dark/light themes), layout and components
css/post.css            Article, listing and Security page typography
css/case-study.css      Case-study layout and diagram styles
css/fonts.css           Self-hosted Geist and Geist Mono font faces
js/theme.js             Applies the saved theme before first paint
js/main.js              Home page: command palette, theme, menu, contact form, footer clock
js/terminal.js          Home page: terminal easter egg
js/page.js              Sub-pages: theme, code copy buttons, footer clock
js/analytics.js         GoatCounter loader (off until a site code is set)
tools/og-image.html     Template for the writeup share images
assets/                 Logo, icons, photos, project images, share images and résumé PDF
.well-known/            security.txt
sitemap.xml, robots.txt, site.webmanifest
CNAME                   Custom domain for GitHub Pages
```

## Configuration

| What | Where | Value |
|---|---|---|
| Contact form | `index.html`, `data-endpoint` on `#contactForm` | Formspree endpoint (set). Empty = opens the visitor's email app |
| Analytics | `js/analytics.js`, `GOATCOUNTER_CODE` | GoatCounter site code. Empty = off (current) |

## Security

- Every page carries a strict Content Security Policy in a `<meta>` tag: scripts, styles and fonts load only from this site, with no inline scripts or styles.
- No cookies, no third-party fonts and no analytics while `GOATCOUNTER_CODE` is empty.
- The terminal writes all output with `textContent`, never `innerHTML`.
- The contact form has a honeypot field for simple bots.
- GitHub Pages can't set HTTP headers, so HSTS and `frame-ancestors` aren't available. See [/security/](https://yasirhassan.tech/security/).

## Caching

GitHub Pages caches files for 10 minutes. CSS and JS links carry a version query, for example `css/style.css?v=20261022b`, and logo and icon links use `?v=3`.
After changing a stylesheet or script, bump the version in every page that links it so visitors get the new file straight away.

## Adding a writeup

1. Copy an existing folder in `writeups/` and edit the content, title, description and dates.
2. Add it to `writeups/index.html`, the Writeups section of `index.html`, `writeups/feed.xml` and `sitemap.xml`.
3. Make its share image and thumbnail (below).

## Share images

Each writeup has a 1200 x 630 share image in `assets/og-<slug>.png` and a small WebP thumbnail for the listing, both made from `tools/og-image.html`.
Run the local server below, then render the template with headless Edge or Chrome:

```bash
msedge --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 --screenshot=assets/og-my-post.png "http://localhost:5510/tools/og-image.html?kicker=Writeup%20%C2%B7%20Topic%20%C2%B7%205%20min%20read&title=Post%20title&desc=One-line%20summary&path=/writeups/&motif=chain"
```

`motif` is `chain` (hash chain) or `detect` (camera detections); leave it out for none.
Then point the writeup's `og:image`, `twitter:image` and JSON-LD `image` at the new file, and save a 400 x 210 WebP copy as `assets/og-<slug>-thumb.webp`.

## Terminal

Press `` ` `` on the home page, or use the terminal button in the header, the footer link or Ctrl K → Open terminal. Try `help`, `whoami`, `ls projects` or `nmap yasirhassan.tech`. Commands live in `js/terminal.js`.

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510.

## Deploy

Hosted on GitHub Pages from the `main` branch with the custom domain in `CNAME`. Pushing to `main` deploys within about a minute.
DNS for `yasirhassan.tech`:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | yasirhassan-sec.github.io |
