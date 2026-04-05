# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio site with vanilla HTML, CSS, and JavaScript — no build tools, bundlers, or package manager. Open any `.html` file directly in a browser to run.

## Architecture

- **Two pages** sharing one stylesheet (`style.css`):
  - `index.html` + `script.js` — portfolio homepage (skills, projects, external data demo via JSONPlaceholder)
  - `weather.html` + `weather.js` — weather app fetching from Open-Meteo API (`api.open-meteo.com`)
- Pages link to each other via `<nav>` in the header. Both pages share the same header/nav/footer layout pattern.
- **Theme system**: dark/light toggle via `body.dark` class, persisted in `localStorage` under key `portfolio_theme`. The theme toggle logic is **duplicated** in both `script.js` and `weather.js` (identical IIFE block at top of each file). Keep them in sync when modifying.
- **CSS dark-mode convention**: every dark-mode override is written as `body.dark <selector>` — not a media query. New components need matching `body.dark` rules.
- All JS is wrapped in IIFEs to avoid global scope pollution.
- External API calls use async/await with `response.ok` checks and try/catch.

## Development

No build step. Serve locally with any static server:

```
python3 -m http.server 8000
```

No tests or linter configured.
