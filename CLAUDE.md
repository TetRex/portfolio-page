# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio site with vanilla HTML, CSS, and JavaScript — no build tools, bundlers, or package manager. Open any `.html` file directly in a browser to run.

## Architecture

- **Two pages** sharing one stylesheet (`style.css`):
  - `index.html` + `script.js` — portfolio homepage (skills, projects, external data demo)
  - `weather.html` + `weather.js` — weather app fetching from Open-Meteo API
- **Theme system**: dark/light toggle via `body.dark` class, persisted in `localStorage` under `portfolio_theme`. Both JS files implement the toggle independently.
- **External APIs**: `script.js` fetches from JSONPlaceholder; `weather.js` fetches from `api.open-meteo.com`. Both use async/await with `response.ok` checks.
- All JS is wrapped in IIFEs to avoid global scope pollution.

## Development

No build step. Serve locally with any static server, e.g.:

```
python3 -m http.server 8000
```

No tests or linter configured.
