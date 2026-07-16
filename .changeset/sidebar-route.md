---
"@tokiui/cli": patch
---

The `sidebar-shell` frame now installs its ready route at `/sidebar` instead of `/dashboard`, so it no longer collides with the `dashboard` frame (which owns `/dashboard`). Previously, installing both meant whichever ran second had its route skipped. Refreshes the registry pin so the new route is served.
