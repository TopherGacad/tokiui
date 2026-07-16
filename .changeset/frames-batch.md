---
"@tokiui/cli": patch
---

Refresh the registry pin so `add` can install the newly-added frames — **login**, **settings**, **dashboard**, and **sales-analytics** — alongside `sidebar-shell`. No CLI code change; the CLI serves its registry from the matching `cli-v{version}` git tag, so a release (and the accompanying tag) is required to surface newly-added frames.
