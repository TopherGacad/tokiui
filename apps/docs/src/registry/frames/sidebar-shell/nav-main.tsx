'use client'

import { useState } from 'react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@tokiui/ui'
import { Grid, Chart, Folder, FileText, ChevronDown } from './icons'

const PROJECTS = ['Acme Marketing', 'Orbit Mobile', 'Internal Tools', 'Design System']

export function NavMain({ active = 'Overview' }: { active?: string }) {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [activeProject, setActiveProject] = useState('Orbit Mobile')

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={active === 'Overview'} tooltip="Overview">
            <Grid />
            <span>Overview</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton isActive={active === 'Analytics'} tooltip="Analytics">
            <Chart />
            <span>Analytics</span>
            <SidebarMenuBadge>4</SidebarMenuBadge>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Nested, collapsible group — powered by SidebarMenuSub */}
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={active === 'Projects'}
            tooltip="Projects"
            aria-expanded={projectsOpen}
            onClick={() => setProjectsOpen((v) => !v)}
          >
            <Folder />
            <span>Projects</span>
            <ChevronDown className={`ml-auto size-3.5 transition-transform duration-200 ${projectsOpen ? '' : '-rotate-90'}`} />
          </SidebarMenuButton>
          {projectsOpen && (
            <SidebarMenuSub>
              {PROJECTS.map((p) => (
                <SidebarMenuSubItem key={p}>
                  <SidebarMenuSubButton asChild isActive={activeProject === p}>
                    <button type="button" onClick={() => setActiveProject(p)}>
                      {p}
                    </button>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton isActive={active === 'Reports'} tooltip="Reports">
            <FileText />
            <span>Reports</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
