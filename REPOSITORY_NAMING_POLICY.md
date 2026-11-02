# Repository and deployment naming policy (proposal)

Status: **PROPOSED — not applied**. Updated 2026-11-02. This file is an inventory and safety policy, not a declaration of production ownership.

## Web repository rename plan

| Current GitHub repository | Proposed repository name | Role | Action gate |
|---|---|---|---|
| `we-do-care-global/we-do-care-global` | `wdcg-portal-legacy-source` | Historical published source; currently linked to Vercel project `we-do-care-global` | Preserve GitHub Pages, references, and Vercel linkage before rename |
| `WeDoCareGlobal/we-do-care-global` | `wdcg-portal-web` | Preferred candidate for maintained portal source; **not confirmed live** | Verify tests and deployment before designation |
| `WeDoCareGlobal/wedocare-global-live` | `wdcg-portal-mirror` | Similar website copy; not confirmed live | Compare all differences; disable duplicate deployment only after verification |
| `WeDoCareGlobal/WeDoCare-Global.Com-Next` | `wdcg-portal-experimental` | Experimental static portal, not Next.js framework | Preserve preview URLs and references |

Names are suggestions, not existing repository names. GitHub redirects after renames must not be assumed sufficient for GitHub Pages, hard-coded references, GitHub Actions, or Vercel Git integrations.

## Vercel deployment names (proposal only)

- Existing `we-do-care-global` project -> `wdcg-web-preview`, **only after checking current Git integration and deployment aliases**.
- Domain-serving project ID `prj_5XoaMiXz1yfJxWLv15g9FyvBGgiu` -> `wdcg-web-production`, **only after project ownership/access is resolved**.
- `shop.wedocare-global.com` is separately mapped to project ID `prj_ca9xkbr5ZmWVSeVzHXJ2irO9iWWT`. **Do not rename, detach, or redirect as part of portal cleanup.**

## Identity and canonicality

- `CANONICAL_WEB_SOURCE` must be an explicit repository + full commit SHA + branch + deployment ID + domain, backed by successful tests and observed deployment metadata. **Currently unconfirmed.**
- `ORIGINAL_PUBLISHED_SOURCE` is not the same as `CANONICAL_WEB_SOURCE`.
- `NEXT_DEVELOPMENT_SOURCE` is not a production claim.
- DOI/Zenodo records establish publication provenance, not a production backend, security certification, or benchmark.

## Agent safety rules

1. Discover and inventory existing repositories, projects, aliases and deployments before creating anything.
2. Match resources by immutable IDs and Git commit SHA, never by fuzzy display names alone.
3. Never create a new deployment or repository as a workaround for an ambiguous existing name without human approval.
4. Never modify DNS, custom-domain assignments, production aliases, Shopify routing, repository visibility, or delete/archive a repository without a separately reviewed change plan and rollback.
5. Any rename requires a dependency audit of workflows, CNAME, Pages URLs, GitHub references, Vercel Git integration, webhooks, API clients, documentation, and DOI metadata links.
6. Execute one rename at a time, check all dependent URLs and deployments, and retain a rollback record.
7. Do not label CI as passed, a backend as functional, or a domain as healthy without direct verification.

## Current evidence boundary

As of 2026-11-02, the Vercel domain-project listing maps apex and www to `prj_5XoaMiXz1yfJxWLv15g9FyvBGgiu`, but direct project read returned 404 and deployment listing returned 403 for the connected team. The separately readable `we-do-care-global` project is not proven to serve the primary domain. No production rename or cutover is authorized by this document.

## Proposed migration order

1. Confirm active domain-serving project access and deployed source SHA.
2. Test the maintained portal and verify Shopify isolation.
3. Rename one non-production repository, repair dependencies, and observe results.
4. Repeat for mirror and experimental sources.
5. Only after a separately reviewed cutover plan, designate or rename production resources.
