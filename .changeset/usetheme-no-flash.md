---
"@tokiui/ui": patch
---

Fix `useTheme` re-applying its initial `light` value to the DOM and `localStorage` on every (re)mount before reading the stored theme, which caused a flash to light on remount. It now adopts the theme already applied to the DOM (by a pre-paint script) or the stored / system value and applies that — no clobber.
