# Website audit fixes — 2026-10-17

## Scope
Preserves the approved homepage design, original logo artwork and brand video. Production source remains this repository's `docs/` with its existing CNAME. The organization website repository receives the same site content; this change does not move DNS or hosting ownership.

## Implemented
- Six static project cards and permanent, consistent project pages.
- Separate original source, Next source, documentation/preview and DOI links.
- An evidence index explaining publication-version boundaries.
- Explicit demonstration scopes; no random retrieval scores or fake audit hashes.
- AgentGuard reference checks fail visibly without simulated successes.
- Human approval illustration requires an explicit choice; no deployment is claimed.
- Evaluation example threshold corrected; values labelled illustrative.
- Accessible menu, focus styles, readable controls, static/no-JS navigation, reduced-motion handling.
- Inquiry text preview, copy and download fallbacks; no false delivery confirmation.
- Privacy and site-scope notices; old analytics beacon removed from public HTML.
- Local font files with their licenses; optimized logo; original video retained.
- Metadata, canonical links, Open Graph, JSON-LD, sitemap, noindex utility routes.
- CSP via HTML meta and Referrer-Policy via meta.
- Pledge aligned to the existing constitution: annual corporate revenue, not profits.
- Pages workflow checks static links/JS and treats HTTP deployment-trigger errors as failures.

## Validation
`python3 scripts/check_site.py docs`: 16 HTML pages, 336 local references, zero errors at initial validation.
JavaScript syntax checks pass for app.js, shared.js and project-demos.js.
Managed preview could not start because its sandbox could not mount proc; pre-publication browser verification was unavailable. Live browser verification is recorded in the delivery report, not assumed here.

## Infrastructure limitations
- GitHub Pages does not apply arbitrary `_headers` files. HSTS, X-Content-Type-Options, Permissions-Policy and CSP frame-ancestors require a supported hosting/proxy configuration; they are not claimed fixed by meta tags.
- Contact remains browser-local. A server receipt requires an approved/configured mail backend, credentials, spam controls and delivery verification. No provider or secret was invented.
- The reference AgentGuard service returned 403 from the audit environment; this change does not claim repair or production validation of that separate service.
- A www response failure from one environment is not sufficient evidence to change DNS. No DNS migration was performed.
- Website repairs do not certify the six backends, their integrations or benchmark results.
