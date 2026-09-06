# Quentin Funcade

A small static site of learning games for toddlers and young kids — typing,
letters, numbers, and more. No framework, no build step: each game is a single
self-contained HTML file, and `index.html` is the hub that links them together.

**Live:** https://quentin-funcade.pages.dev

## Games

| Game | File | Skills | Ages |
| --- | --- | --- | --- |
| Banana Buddies | `banana-spelling.html` | Typing, letters, spelling | 2–6 |

## Play timer

The hub runs each game in a full-screen iframe. A grown-up picks a time limit
(5–30 minutes, or none) before starting. When the time is up, a plain
"taking a break" screen covers the game. The deadline is stored in
`localStorage`, so reloading the page does not reset it. To exit early or leave
the break screen, hold the corner button for two seconds.

## Develop

Open `index.html` in a browser, or serve the folder:

```
npm install
npm run dev        # wrangler pages dev . — serves at localhost
```

## Deploy

Hosted on Cloudflare Pages (project `quentin-funcade`).

```
npm run deploy     # wrangler pages deploy .
```

The site root is the deploy output — there is no build. `_headers` tells
Cloudflare to always revalidate HTML so game updates go live immediately.

To switch to auto-deploy on every push, connect this repo in the Cloudflare
dashboard: Workers & Pages -> quentin-funcade -> Settings -> Builds & deployments.
Leave the build command empty and set the output directory to `/`.

## Add a game

1. Drop a new self-contained `*.html` file at the repo root.
2. Add a `<a class="card">` block for it in `index.html`.
3. Add a row to the table above.

Keep each game in one file: inline CSS and JS, no external requests. This keeps
games easy to open directly, easy to review, and fast to load.
