# Consolidation preparation — 2026-10-22

## Target and safety boundary
Canonical website target: `WeDoCareGlobal/we-do-care-global`.
Current live production remains sourced from `we-do-care-global/we-do-care-global` via the existing Vercel project. Do not change Vercel Git integration, DNS, production, or merge this branch without separate approval.

## Connected GitHub inventory (first-page results)
- `we-do-care-global`: 68 repositories
- `WeDoCareGlobal-CC`: 55 repositories
- `WeDoCareGlobal`: 10 repositories
- Total surfaced: 133 repository entries; this is not a full code review or a guarantee of distinct projects.

## Verified selected-file comparison (default branches)
Same Git blob SHA:
- `docs/app.js`
- `docs/shared.js`
- `docs/project-demos.js`
- `README.md`
- `WEBSITE_AUDIT_FIXES.md`

Different Git blob SHA:
- `docs/index.html` (production-source `9d3cec85b4c907e16dac79a3e38f234d477ef622`; organization `8d0c43287a93babb3a010adc79114a6565092123`)
- `scripts/check_site.py` (production-source `b11fb0d626c18782bbed3a93452506b64ac0a8c5`; organization `276ed43300a99f4a03cacf8bcd2617d29fe22e0f`)

Absent in organization repository at inspected paths:
- `package.json`
- `vercel.json`
- `scripts/build-vercel.mjs`
- `.github/workflows/vercel-static.yml`

## Production baseline
Vercel project: `we-do-care-global`.
Custom domain: `wedocare-global.com`.
Last observed production deployment: `dpl_BCEDuK24ohQmr8CARkeS6hJziDRp`, READY.
GitHub source: `we-do-care-global/we-do-care-global`, branch `main`, commit `9911ad46ebe3f9186138a98b1e481e3a1acdfb9b`.
GitHub combined commit status showed `Vercel: success`. This does not prove functional tests.

## Required gates before any production cutover
1. Inventory repository contents, distinguish source-of-truth projects from mirrors, experiments and private assets.
2. Review complete file differences, preserving intended changes from both sources.
3. Audit for credentials, private code exposure, dependency vulnerabilities and license compatibility before any publication.
4. Build a reproducible website and CI pipeline on this migration branch.
5. Run static checks, browser smoke tests, performance checks and API integration tests where applicable.
6. Produce a preview deployment and document acceptance evidence.
7. Open a draft PR for human review; do not merge or change production without separate approval.
8. Prepare rollback and validate live domain only after authorized cutover.

## Architecture constraint
Do not merge unrelated private service repositories into the public website repository. Integrate via documented, versioned APIs and separate deployments where appropriate.
