# Rename preflight: experimental website repository

Status: **READ-ONLY PREFLIGHT; RENAME NOT EXECUTED** — 2026-11-02.

Target: `WeDoCareGlobal/WeDoCare-Global.Com-Next` → proposed `WeDoCareGlobal/wdcg-portal-experimental`.

## Verified dependencies

- Repository is public, default branch `main`; connected GitHub metadata indicates admin permission.
- README describes a static website source at the repository root, not a Next.js framework application.
- Root `vercel.json` specifies `node scripts/build-vercel.mjs` and `dist` output. A Vercel project `wedocare-global.com-next` was previously observed linked to this repository, with a READY deployment; that does not establish domain ownership.
- No root `CNAME`, `docs/CNAME`, or `.github/workflows/pages.yml` was found at the checked default branch paths. This is not proof that no other workflows or references exist.
- README claims current production comes from the original account, while `WEBSITE_AUDIT_FIXES.md` contains historical statements about another `docs/` source. Neither claim establishes the live Vercel source.
- Main domain and www were mapped to a different Vercel project ID, `prj_5XoaMiXz1yfJxWLv15g9FyvBGgiu`; the shop subdomain maps to `prj_ca9xkbr5ZmWVSeVzHXJ2irO9iWWT`. Neither mapping should be changed in this rename.

## Gates before actual rename

1. Inspect all GitHub workflows, branch protection, Pages settings, Actions secrets references, webhooks, and consumers of the old repository URL.
2. Confirm Vercel project `wedocare-global.com-next` Git integration can follow the renamed repository and that preview deploys remain reproducible.
3. Search source files and external documentation for absolute GitHub URLs and update references in a controlled PR.
4. Record current repository name, ID `1421259775`, default branch, commit SHA, Vercel project ID, and known preview URL before the change.
5. Rename only this repository; run CI and preview smoke tests, then validate redirects and dependent integrations. Roll back the repository name if a dependency breaks.

## Execution blocker

The currently available connected GitHub actions do not expose a repository rename/update-settings operation. **No rename was attempted through unsupported means.** A repository admin can perform the rename in GitHub Settings after the gates above, or an authorized repository-settings connector can be used if made available. Do not create a replacement repository to mimic a rename.
