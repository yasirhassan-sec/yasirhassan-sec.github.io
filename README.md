# Yasir Hassan · Portfolio

Personal portfolio site. Hand-coded in HTML, CSS and vanilla JavaScript, with no frameworks, no build step and no trackers.

## Structure

```
index.html      Page markup, SEO meta tags and JSON-LD structured data
css/style.css   Design tokens (dark/light themes), layout and components
js/main.js      Interactions: command palette, theme, navigation, reveal
assets/         Images, favicon and résumé PDF
```

## Features

- Dark-first design with a light theme, remembered per visitor
- Command palette (`Ctrl K` / `⌘K`) for navigation and quick actions
- Content Security Policy, `security.txt`, Open Graph image and JSON-LD
- Accessible: skip link, keyboard focus styles, ARIA labels, reduced-motion support
- Responsive down to 320px wide

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5510
```

## Deploy

Any static host works. For GitHub Pages, push this folder to a repository and enable Pages on the `main` branch.
