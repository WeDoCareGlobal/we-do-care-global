#!/usr/bin/env python3
"""Validate generated Vercel static output without modifying source."""
from pathlib import Path
from html.parser import HTMLParser
import sys

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".vercel-site")
SOURCE = Path("docs")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.csp = False
        self.canonical = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "content-security-policy":
            self.csp = True
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = True


def main():
    if not ROOT.is_dir():
        raise SystemExit(f"Missing output directory: {ROOT}")
    if not (ROOT / "analytics-init.js").is_file():
        raise SystemExit("Missing analytics-init.js")
    pages = sorted(p for p in ROOT.glob("*.html") if not p.name.startswith("google"))
    sources = sorted(p for p in SOURCE.glob("*.html") if not p.name.startswith("google"))
    if len(pages) != len(sources) or not pages:
        raise SystemExit(f"HTML page count mismatch: source={len(sources)} output={len(pages)}")
    errors = []
    for page in pages:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for src in ("/analytics-init.js", "/_vercel/insights/script.js"):
            if parser.scripts.count(src) != 1:
                errors.append(f"{page}: expected exactly one {src}")
        if not parser.csp or not parser.canonical:
            errors.append(f"{page}: missing CSP or canonical metadata")
        if not (SOURCE / page.name).is_file():
            errors.append(f"{page}: no matching source HTML")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} generated HTML pages, CSP/canonical and analytics injection verified")


if __name__ == "__main__":
    main()
