'use client'

import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@tokiui/ui'
import { cn } from '@tokiui/ui'

/* ================================================================
   Shared: nav link item used inside content panels
   ================================================================ */

function NavItem({
  href,
  title,
  children,
}: {
  href: string
  title: string
  children: React.ReactNode
}) {
  return (
    <NavigationMenuLink
      href={href}
      className={cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
        'text-foreground transition-colors duration-150',
        'hover:bg-muted focus:bg-muted',
        'focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
    </NavigationMenuLink>
  )
}

/* ================================================================
   1. BASIC
   ================================================================ */

export function NavigationMenuBasicPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        {/* Getting Started dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 md:w-[380px]">
              <li>
                <NavItem href="#" title="Introduction">
                  An overview of tokiui — what it is, how it works, and when to use it.
                </NavItem>
              </li>
              <li>
                <NavItem href="#" title="Installation">
                  How to add tokiui to a new or existing project using the CLI or manual steps.
                </NavItem>
              </li>
              <li>
                <NavItem href="#" title="Theming">
                  Apply one of the five preset themes or create your own with CSS design tokens.
                </NavItem>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Components dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[420px] grid-cols-2 gap-1 p-3">
              {[
                { title: 'Button',    desc: 'Solid, outline, soft, ghost, and link variants.' },
                { title: 'Dialog',    desc: 'Modal overlay with focus trap and aria support.'  },
                { title: 'Accordion', desc: 'Collapsible sections with smooth animation.'      },
                { title: 'Tabs',      desc: 'Tabbed panels with keyboard navigation.'          },
                { title: 'Tooltip',   desc: 'Contextual label on hover or focus.'              },
                { title: 'Badge',     desc: 'Inline label for status, counts, or tags.'        },
              ].map((c) => (
                <li key={c.title}>
                  <NavItem href="#" title={c.title}>{c.desc}</NavItem>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className="inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Changelog
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ================================================================
   2. WITH FEATURED CARD
   ================================================================ */

export function NavigationMenuFeaturedPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid md:w-[500px] md:grid-cols-[200px_1fr] gap-1 p-3">
              {/* Featured card */}
              <NavigationMenuLink
                href="#"
                className="flex flex-col justify-end rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 p-4 no-underline outline-none focus:ring-2 focus:ring-ring row-span-3"
              >
                <div className="mb-2 mt-4 text-sm font-semibold text-foreground">tokiui</div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Production-grade React components built on Radix UI and Tailwind CSS.
                </p>
              </NavigationMenuLink>

              {/* Link list */}
              <NavItem href="#" title="Component library">
                25+ accessible, composable components ready to copy-paste.
              </NavItem>
              <NavItem href="#" title="CLI tool">
                Add components to your project with a single command.
              </NavItem>
              <NavItem href="#" title="Preset themes">
                Five themes — default, neon, newspaper, rose, slate.
              </NavItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[340px] gap-1 p-3">
              {[
                { title: 'API reference',   desc: 'Full props and types for every component.' },
                { title: 'Accessibility',   desc: 'ARIA patterns and keyboard navigation guide.' },
                { title: 'Contributing',    desc: 'How to open issues and submit pull requests.' },
              ].map((item) => (
                <li key={item.title}>
                  <NavItem href="#" title={item.title}>{item.desc}</NavItem>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className="inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ================================================================
   3. ICON + LABEL LINKS
   ================================================================ */

function IconBook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function IconZap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconPalette(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

function IconTerminal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}

const RESOURCE_LINKS = [
  { icon: IconBook,     title: 'Documentation',  desc: 'Guides, examples, and API reference.' },
  { icon: IconZap,      title: 'Quick start',    desc: 'Up and running in under 5 minutes.'   },
  { icon: IconPalette,  title: 'Themes',         desc: 'Customise every design token.'        },
  { icon: IconTerminal, title: 'CLI',            desc: 'Add and update components via CLI.'   },
]

export function NavigationMenuIconPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[440px] grid-cols-2 gap-1 p-3">
              {RESOURCE_LINKS.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink
                    href="#"
                    className="flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground">
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium leading-none text-foreground">{title}</div>
                      <p className="text-xs leading-snug text-muted-foreground">{desc}</p>
                    </div>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className="inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className="inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ================================================================
   4. SIMPLE LINK BAR  — NavigationMenuLink only, underline-on-active
   ================================================================ */

const SIMPLE_LINKS = ['Home', 'Products', 'Pricing', 'Blog', 'About']

export function NavigationMenuSimplePreview() {
  const [active, setActive] = React.useState('Products')

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0">
        {SIMPLE_LINKS.map((label) => {
          const isActive = label === active
          return (
            <NavigationMenuItem key={label}>
              <NavigationMenuLink
                href="#"
                onClick={(e) => { e.preventDefault(); setActive(label) }}
                className={cn(
                  'relative inline-flex h-10 cursor-pointer items-center px-4 text-sm font-medium transition-colors duration-150 no-underline',
                  'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:transition-all after:duration-200',
                  isActive
                    ? 'text-foreground after:bg-primary'
                    : 'text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100 after:bg-border',
                )}
              >
                {label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ================================================================
   5. MEGA MENU — full-width panel with columns and section headers
   ================================================================ */

const MEGA_SECTIONS = [
  {
    heading: 'Components',
    items: [
      { label: 'Button',   desc: 'Actions and calls-to-action'  },
      { label: 'Dialog',   desc: 'Modal overlays'               },
      { label: 'Popover',  desc: 'Contextual floating panels'    },
      { label: 'Tabs',     desc: 'Segmented content areas'       },
    ],
  },
  {
    heading: 'Forms',
    items: [
      { label: 'Input',    desc: 'Text and number entry'        },
      { label: 'Select',   desc: 'Single-choice dropdowns'      },
      { label: 'Checkbox', desc: 'Multi-select toggles'         },
      { label: 'Switch',   desc: 'Boolean on/off controls'      },
    ],
  },
  {
    heading: 'Feedback',
    items: [
      { label: 'Toast',    desc: 'Non-blocking notifications'   },
      { label: 'Alert',    desc: 'Inline status messages'       },
      { label: 'Progress', desc: 'Task completion indicators'   },
      { label: 'Skeleton', desc: 'Loading placeholders'         },
    ],
  },
]

export function NavigationMenuMegaPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-0 p-2">
              {MEGA_SECTIONS.map((section, si) => (
                <div
                  key={section.heading}
                  className={cn(
                    'px-3 py-2',
                    si < MEGA_SECTIONS.length - 1 && 'border-r border-border',
                  )}
                >
                  <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.heading}
                  </p>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink
                          href="#"
                          className="flex cursor-pointer flex-col rounded-md px-2 py-2 text-sm no-underline transition-colors hover:bg-muted"
                        >
                          <span className="font-medium text-foreground leading-none mb-0.5">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-border bg-muted/50 px-5 py-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">25+ components, all accessible</span>
              <NavigationMenuLink href="#" className="text-xs font-medium text-primary no-underline hover:underline cursor-pointer">
                View all →
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] grid-cols-2 gap-1 p-3">
              {[
                { label: 'Dashboards', desc: 'Data-rich admin layouts'       },
                { label: 'Marketing',  desc: 'Landing pages and hero blocks'  },
                { label: 'E-commerce', desc: 'Product and checkout flows'     },
                { label: 'SaaS',       desc: 'App shells and onboarding'      },
              ].map((s) => (
                <li key={s.label}>
                  <NavItem href="#" title={s.label}>{s.desc}</NavItem>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className="inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
