# Repository Guidelines

## Project Structure & Module Organization
This repository is a small static portfolio site.

- `index.html`: main portfolio page.
- `weather.html`: weather demo page.
- `style.css`: shared styles for both pages.
- `script.js`: behavior for `index.html` (theme toggle, external data demo, last-updated date).
- `weather.js`: behavior for `weather.html` (theme toggle, weather fetch, debug log).
- `README.md`: minimal project overview.

Keep page-specific logic in the matching JS file and keep reusable visual rules in `style.css`.

## Build, Test, and Development Commands
No build step or package manager is configured; this is plain HTML/CSS/JS.

- `python3 -m http.server 8000`: run a local server from repo root.
- `open http://localhost:8000` (macOS): open the site in a browser.
- `node --check script.js && node --check weather.js`: quick syntax validation for JS files.

## Coding Style & Naming Conventions
- Use 2-space indentation (matches existing HTML/CSS/JS).
- Use modern JavaScript (`const`/`let`, `async`/`await`, template literals).
- Prefer double quotes in JS strings, consistent with current files.
- Use `kebab-case` for CSS classes/IDs (for example, `project-card`, `theme-toggle`).
- Keep functions focused and DOM lookups grouped near their usage.
- Add short comments only when behavior is non-obvious.

## Testing Guidelines
There is currently no automated test framework in this repo. Use manual verification:

1. Start local server and open both pages.
2. Verify theme toggle persists across page reloads.
3. Verify external API features (`Load Data`, city weather buttons) succeed and fail gracefully.
4. Check browser console for errors.

If tests are added later, place them in a top-level `tests/` directory.

## Commit & Pull Request Guidelines
History mostly uses short, imperative commit messages (for example, `Add weather app...`, `Update skills...`). Follow that style:

- Format: `Verb + target` (example: `Refactor weather button handlers`).
- Keep commits scoped to one logical change.
- Avoid vague messages like `fix` or `1`.

PRs should include:
- a concise summary of what changed,
- any manual test steps performed,
- screenshots/GIFs for UI changes,
- linked issue/task when applicable.

## Security & Configuration Tips
- Do not commit secrets or API keys.
- Prefer public, keyless demo APIs unless environment-based configuration is introduced.
- Handle fetch errors explicitly so UI failures stay user-friendly.
