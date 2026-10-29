# Website publication gap audit — 2026-10-28

Status: **REVIEW REQUIRED — no production changes made**.

## Provenance
- Production is documented as `we-do-care-global/we-do-care-global`, `main:/docs`; `docs/CNAME` contains `wedocare-global.com`.
- Separate organization source: `WeDoCareGlobal/WeDoCare-Global.Com-Next`.
- This document records repository-level observations, **not a successful live browser check**. External fetch of https://www.wedocare-global.com/ was unavailable in the audit environment.

## Verified source gaps
1. Organization Next source includes `ai-security-assessment.html`, absent from production `docs/`. Confirm whether this route is approved before copying its assets, scripts, policies and forms.
2. Organization Next source includes `.well-known/security.txt`, absent from production `docs/.well-known/`. Review contact/disclosure details before adding.
3. Next `sitemap.xml` includes the assessment route; production `docs/sitemap.xml` does not. Do **not** add sitemap URLs before publishing their actual pages.
4. Next homepage uses `https://www.wedocare-global.com/` canonical while production homepage uses `https://wedocare-global.com/`; production CNAME uses apex. Confirm canonical/redirect behavior and standardize all canonical, Open Graph and sitemap URLs.
5. The Next repository's README says it is **not** the live publishing source. Changes there will not automatically deploy to production.

## Release gates
- Verify DNS/TLS/redirects for both apex and www externally; do not infer them from source.
- Compare the two website trees, including assets, fonts, JS, accessibility and forms; only copy approved content.
- Run `python3 scripts/check_site.py docs`, and `node --check` on the site JS.
- Validate security headers at the actual hosting edge. GitHub Pages does not apply arbitrary `_headers` files.
- Verify contact flow without claiming delivery where none exists.
- Cross-check public project claims against evidence and CI; distinguish original published versions from Next development.
- Require successful Pages deployment and live smoke tests before marking PUBLISHED.
- No main merge, deployment, DNS change, billing change, deletion, or secret modification without explicit approval.

## Recommended publication workflow
Stage an isolated PR against the **actual production repo** with reviewed source parity fixes. Obtain approval for `main` merge, observe Pages build, and verify public routes after deployment.
