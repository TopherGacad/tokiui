'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function TabsBasicPreview() {
  return (
    <Tabs defaultValue="editor" style={{ width: '100%', maxWidth: 400 }}>
      <TabsList>
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <div style={{ padding: '16px 4px', fontSize: 14, color: 'var(--muted-foreground)' }}>
          Write and format your content here.
        </div>
      </TabsContent>
      <TabsContent value="preview">
        <div style={{ padding: '16px 4px', fontSize: 14, color: 'var(--muted-foreground)' }}>
          See how your content will appear when published.
        </div>
      </TabsContent>
      <TabsContent value="output">
        <div style={{ padding: '16px 4px', fontSize: 14, color: 'var(--muted-foreground)' }}>
          Compiled output and build results.
        </div>
      </TabsContent>
    </Tabs>
  )
}

/* ================================================================
   2. WITH CONTENT CARDS
   ================================================================ */

export function TabsWithCardsPreview() {
  return (
    <Tabs defaultValue="files" style={{ width: '100%', maxWidth: 440 }}>
      <TabsList>
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="files">
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 8 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Project files</p>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: '2px 0 0' }}>3 files · updated 2 hours ago</p>
          </div>
          <div style={{ padding: '0 20px' }}>
            {[
              { name: 'components.tsx', size: '4.2 KB' },
              { name: 'styles.css',     size: '11.8 KB' },
              { name: 'README.md',      size: '1.1 KB' },
            ].map((file, i, arr) => (
              <div key={file.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined }}>
                <span style={{ fontSize: 13, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>{file.name}</span>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="members">
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 8 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Team members</p>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: '2px 0 0' }}>3 members with access</p>
          </div>
          <div style={{ padding: '0 20px' }}>
            {[
              { initials: 'SC', role: 'Owner'  },
              { initials: 'TL', role: 'Editor' },
              { initials: 'MK', role: 'Viewer' },
            ].map((m, i, arr) => (
              <div key={m.initials} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{m.initials}</div>
                  <span style={{ fontSize: 13, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>{m.initials.toLowerCase()}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 8 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>Recent activity</p>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: '2px 0 0' }}>Last 24 hours</p>
          </div>
          <div style={{ padding: '0 20px' }}>
            {[
              { text: 'Deployed to production',   time: '2h ago' },
              { text: 'Merged pull request #42',  time: '5h ago' },
              { text: 'Added 3 new components',   time: '9h ago' },
            ].map((entry, i, arr) => (
              <div key={entry.text} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined }}>
                <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{entry.text}</span>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)', flexShrink: 0, marginLeft: 12 }}>{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

/* ================================================================
   3. UNDERLINE VARIANT
   ================================================================ */

const UNDERLINE_TABS = [
  { value: 'all',      label: 'All',      count: 128 },
  { value: 'active',   label: 'Active',   count: 43  },
  { value: 'draft',    label: 'Draft',    count: 31  },
  { value: 'archived', label: 'Archived', count: 54  },
]

export function TabsUnderlinePreview() {
  return (
    <Tabs defaultValue="all" style={{ width: '100%', maxWidth: 440 }}>
      <TabsList className="h-auto gap-0 rounded-none border-b border-border bg-transparent p-0">
        {UNDERLINE_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="gap-1.5 rounded-none border-b-2 border-transparent px-3 pb-2.5 pt-1 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab.label}
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: 999,
              background: 'var(--muted)',
              color: 'var(--muted-foreground)',
            }}>
              {tab.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {UNDERLINE_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <p style={{ padding: '14px 2px', fontSize: 14, color: 'var(--muted-foreground)', margin: 0 }}>
            Showing <strong style={{ color: 'var(--foreground)' }}>{tab.count}</strong> {tab.value === 'all' ? 'total' : tab.value} items.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  )
}

/* ================================================================
   4. PILL VARIANT
   ================================================================ */

export function TabsPillPreview() {
  const [active, setActive] = useState('week')
  const ranges = ['Day', 'Week', 'Month', 'Year']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999, background: 'var(--muted)' }}>
        {ranges.map((r) => {
          const isActive = active === r.toLowerCase()
          return (
            <button
              key={r}
              onClick={() => setActive(r.toLowerCase())}
              style={{
                padding: '5px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'var(--background)' : 'transparent',
                color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                boxShadow: isActive ? '0 1px 3px oklch(0 0 0 / 0.10)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {r}
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
        Viewing data for the selected <strong style={{ color: 'var(--foreground)' }}>{active}</strong>.
      </p>
    </div>
  )
}

/* ================================================================
   5. VERTICAL
   ================================================================ */

const VERTICAL_TABS = [
  { value: 'general',     label: 'General',      content: 'Configure your workspace name, timezone, and language.' },
  { value: 'team',        label: 'Team',         content: 'Invite members, manage roles, and set permissions.'     },
  { value: 'integrations',label: 'Integrations', content: 'Connect third-party tools and manage API keys.'         },
  { value: 'billing',     label: 'Billing',      content: 'Update your plan, payment method, and view invoices.'   },
]

export function TabsVerticalPreview() {
  return (
    <Tabs defaultValue="general" orientation="vertical" style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 480 }}>
      <TabsList style={{ flexDirection: 'column', height: 'auto', alignItems: 'stretch', borderRadius: 8, gap: 2, minWidth: 140 }}>
        {VERTICAL_TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value} style={{ justifyContent: 'flex-start' }}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div style={{ flex: 1, paddingLeft: 20 }}>
        {VERTICAL_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} style={{ marginTop: 0 }}>
            <p style={{ fontSize: 14, color: 'var(--muted-foreground)', margin: 0, paddingTop: 6 }}>
              {t.content}
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

/* ================================================================
   6. DISABLED TAB
   ================================================================ */

export function TabsDisabledPreview() {
  return (
    <Tabs defaultValue="overview" style={{ width: '100%', maxWidth: 400 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div style={{ padding: '16px 4px', fontSize: 14, color: 'var(--muted-foreground)' }}>
          Your project overview and recent activity.
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div style={{ padding: '16px 4px', fontSize: 14, color: 'var(--muted-foreground)' }}>
          Detailed analytics and performance metrics.
        </div>
      </TabsContent>
    </Tabs>
  )
}
