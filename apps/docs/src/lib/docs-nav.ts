export type NavItem = { label: string; href: string; pill?: string }
export type NavSection = { label: string; items: NavItem[] }

export const nav: NavSection[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Theming',      href: '/docs/theming',      pill: 'new' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button',        href: '/docs/components/button'        },
      { label: 'Badge',         href: '/docs/components/badge'         },
      { label: 'Card',          href: '/docs/components/card'          },
      { label: 'Input',         href: '/docs/components/input'         },
      { label: 'Dialog',        href: '/docs/components/dialog'        },
      { label: 'Alert',         href: '/docs/components/alert',         pill: 'new' },
      { label: 'Alert Dialog',  href: '/docs/components/alert-dialog',  pill: 'new' },
      { label: 'Toast',         href: '/docs/components/toast',         pill: 'new' },
      { label: 'Tooltip',       href: '/docs/components/tooltip',       pill: 'new' },
      { label: 'Popover',       href: '/docs/components/popover',       pill: 'new' },
      { label: 'Select',        href: '/docs/components/select',        pill: 'new' },
      { label: 'Checkbox',      href: '/docs/components/checkbox',      pill: 'new' },
      { label: 'Radio Group',   href: '/docs/components/radio-group',   pill: 'new' },
      { label: 'Switch',        href: '/docs/components/switch',        pill: 'new' },
      { label: 'Textarea',      href: '/docs/components/textarea',      pill: 'new' },
      { label: 'Tabs',          href: '/docs/components/tabs',          pill: 'new' },
      { label: 'Dropdown Menu', href: '/docs/components/dropdown-menu', pill: 'new' },
      { label: 'Sheet',         href: '/docs/components/sheet',         pill: 'new' },
      { label: 'Spinner',       href: '/docs/components/spinner',       pill: 'new' },
      { label: 'Skeleton',      href: '/docs/components/skeleton',      pill: 'new' },
      { label: 'Separator',     href: '/docs/components/separator',     pill: 'new' },
      { label: 'Avatar',        href: '/docs/components/avatar',        pill: 'new' },
    ],
  },
]

export const flatNav: NavItem[] = nav.flatMap((s) => s.items)
