# Navigation Menu

Date: 2026-06-02

---

## Component (`navigation-menu.tsx`)

Built on `@radix-ui/react-navigation-menu` (newly installed).

### Components

- `NavigationMenu` — root; automatically includes `NavigationMenuViewport` so users don't need to place it manually
- `NavigationMenuList` — `<ul>` flex row of menu items
- `NavigationMenuItem` — `<li>` wrapper (re-export of Radix primitive)
- `NavigationMenuTrigger` — button with rotating chevron; `data-[state=open]` styles via Tailwind
- `NavigationMenuContent` — panel content; animates in/out with directional slide using `data-[motion]` attributes provided by Radix
- `NavigationMenuLink` — direct link (no dropdown); re-export of Radix primitive
- `NavigationMenuViewport` — floating container; sized by Radix CSS vars `--radix-navigation-menu-viewport-width/height`
- `NavigationMenuIndicator` — optional animated caret pointing to the open viewport

### Animations

Six new keyframes added to `styles.css`:
- `nav-viewport-in` / `nav-viewport-out` — fade + translate for the viewport
- `nav-content-from-left` / `nav-content-from-right` — slide for content entering
- `nav-content-to-left` / `nav-content-to-right` — slide for content exiting

### Docs

Three demos:
1. Basic — two trigger dropdowns with simple link lists + a standalone link
2. Featured card — asymmetric grid with a gradient card alongside link items
3. Icon links — 2-column grid of icon-badge + title + description links
