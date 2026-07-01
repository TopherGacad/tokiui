---
"@tokiui/cli": patch
---

Refresh the registry pin so `tokiui add` can install the components added since 0.2.0 — **Combobox**, **Kbd**, **Table**, and **Chart**. The CLI serves its component registry from the matching `cli-v{version}` git tag, so a release (and the accompanying tag) is required to surface newly-added components.
