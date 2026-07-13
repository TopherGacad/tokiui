'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@tokiui/ui'
import { Users, CreditCard, Cog } from './icons'

const ITEMS = [
  { key: 'Team', icon: Users },
  { key: 'Billing', icon: CreditCard },
  { key: 'Settings', icon: Cog },
]

export function NavSecondary({ active }: { active?: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        {ITEMS.map(({ key, icon: Icon }) => (
          <SidebarMenuItem key={key}>
            <SidebarMenuButton isActive={active === key} tooltip={key}>
              <Icon />
              <span>{key}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
