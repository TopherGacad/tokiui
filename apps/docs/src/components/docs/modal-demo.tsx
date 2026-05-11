'use client'

import { useState } from 'react'
import {
  Button,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody,
  DialogFooter, DialogTitle, DialogDescription, DialogClose,
} from '@tokiui/ui'

/* ----- Shared helpers ----- */

function Field({
  label, id, ...props
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)', background: 'var(--input)',
          color: 'var(--foreground)', fontSize: 14, outline: 'none',
          fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ring)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        {...props}
      />
    </div>
  )
}

/* ================================================================
   1. BASIC DIALOG
   ================================================================ */

export function BasicDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>
            Your session has been restored. You can continue where you left off.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   2. ALERT / DESTRUCTIVE CONFIRMATION
   ================================================================ */

export function AlertDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="destructive">Delete project</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All data, members, and history will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="neutral">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button color="destructive">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   3. FORM DIALOG
   ================================================================ */

export function FormDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite teammate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite teammate</DialogTitle>
          <DialogDescription>Send an invite link to add someone to your project.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'grid', gap: 14 }}>
          <Field label="Email address" id="fd-email" type="email" placeholder="teammate@company.com" />
          <Field label="Role" id="fd-role" placeholder="Editor, Viewer, Admin…" />
          <Field label="Message (optional)" id="fd-message" placeholder="Hey, join our project!" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="neutral">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Send invite</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   4. SCROLLABLE CONTENT
   ================================================================ */

const TOC_TEXT = `These Terms of Service govern your access to and use of our platform. By continuing, you agree to be bound by these terms in their entirety.

1. Acceptance of Terms
By accessing or using our services, you confirm that you are at least 18 years old and agree to these terms. If you are using the services on behalf of an organization, you represent that you have authority to bind that organization.

2. Use of Services
You may use our services only for lawful purposes. You agree not to misuse our services, attempt to access them using unauthorized means, or interfere with other users' access.

3. Your Content
You retain ownership of any content you submit. By submitting content, you grant us a worldwide, royalty-free license to use, host, store, reproduce, and display it solely to provide the service.

4. Privacy
Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using our services, you agree to our data practices.

5. Termination
We reserve the right to suspend or terminate your access to our services at any time, without notice, if you violate these terms or engage in behavior we deem harmful.

6. Limitation of Liability
To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of our services.

7. Changes to Terms
We may update these terms from time to time. We will notify you of significant changes by email or via a notice in the service.`

export function ScrollableDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms of service</Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col max-h-[80vh] p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Please read carefully before accepting.</DialogDescription>
        </DialogHeader>
        <DialogBody className="px-6 py-2" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--muted-foreground)', whiteSpace: 'pre-line', paddingBlock: 16 }}>
            {TOC_TEXT}
          </p>
        </DialogBody>
        <DialogFooter className="px-6 pb-6 pt-4 shrink-0">
          <DialogClose asChild>
            <Button variant="outline" color="neutral">Decline</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>I accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   5. SIZE VARIANTS
   ================================================================ */

export function SizeVariantsPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
      {(['sm', 'default', 'lg', 'full'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size: {size}</DialogTitle>
              <DialogDescription>
                This dialog uses the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--muted)', padding: '1px 5px', borderRadius: 4 }}>size="{size}"</code> prop.
                {size === 'sm' && ' Use for confirmations and short messages.'}
                {size === 'default' && ' Use for forms and standard content.'}
                {size === 'lg' && ' Use for data-heavy content or multi-column forms.'}
                {size === 'full' && ' Use for focused workflows that need maximum space.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" color="neutral">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

/* ================================================================
   6. LOADING STATE
   ================================================================ */

export function LoadingDialogPreview() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!loading) setOpen(o) }}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Save to cloud</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save changes</DialogTitle>
          <DialogDescription>
            Your work will be saved to the cloud and synced across devices.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: 'grid', gap: 12 }}>
          <Field label="Filename" id="ld-file" defaultValue="Q4 Report Final.pdf" />
          <Field label="Save to" id="ld-folder" defaultValue="/Documents/Reports" />
        </div>
        <DialogFooter>
          <Button variant="outline" color="neutral" disabled={loading} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={loading} aria-busy={loading} onClick={handleSave}>
            {loading && <span className="btn-spinner" aria-hidden="true" />}
            {loading ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   7. NO BACKDROP DISMISS
   ================================================================ */

export function NoBackdropDialogPreview() {
  const [open, setOpen] = useState(false)
  const [dirty, setDirty] = useState(false)

  function handleOpenChange(next: boolean) {
    if (!next && dirty) return  // block close if there are unsaved changes
    setOpen(next)
    if (!next) setDirty(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>Edit with guard</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => { if (dirty) e.preventDefault() }}>
        <DialogHeader>
          <DialogTitle>Unsaved changes guard</DialogTitle>
          <DialogDescription>
            Edit the field below. Once you type something, the dialog will block backdrop clicks and Escape until you save or discard.
          </DialogDescription>
        </DialogHeader>
        <Field
          label="Project name"
          id="nb-name"
          placeholder="Type to mark as dirty…"
          onChange={(e) => setDirty(e.target.value.length > 0)}
        />
        {dirty && (
          <p style={{ fontSize: 13, color: 'var(--destructive)' }}>
            You have unsaved changes.
          </p>
        )}
        <DialogFooter>
          <Button variant="outline" color="neutral" onClick={() => { setDirty(false); setOpen(false) }}>
            Discard
          </Button>
          <Button onClick={() => { setDirty(false); setOpen(false) }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   8. CUSTOM FOOTER LAYOUT
   ================================================================ */

export function CustomFooterDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage subscription</DialogTitle>
          <DialogDescription>
            Changes take effect at the start of your next billing cycle.
          </DialogDescription>
        </DialogHeader>
        <div style={{ padding: '4px 0', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          Current plan: <strong style={{ color: 'var(--foreground)' }}>Pro · $29/mo</strong>
        </div>
        {/* Destructive action left, safe actions right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <DialogClose asChild>
            <Button variant="ghost" color="destructive">Cancel plan</Button>
          </DialogClose>
          <div style={{ display: 'flex', gap: 8 }}>
            <DialogClose asChild>
              <Button variant="outline" color="neutral">Maybe later</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Upgrade to Team</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   9. MULTI-STEP WIZARD
   ================================================================ */

const WIZARD_STEPS = ['Account', 'Profile', 'Review']

export function WizardDialogPreview() {
  const [step, setStep] = useState(1)
  const total = WIZARD_STEPS.length

  function reset() { setTimeout(() => setStep(1), 200) }

  return (
    <Dialog onOpenChange={(open) => { if (!open) reset() }}>
      <DialogTrigger asChild>
        <Button>Create account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <DialogTitle>{WIZARD_STEPS[step - 1]}</DialogTitle>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
              {step} / {total}
            </span>
          </div>
          <DialogDescription>
            {step === 1 && 'Set up your login credentials.'}
            {step === 2 && 'Tell us how to address you.'}
            {step === 3 && 'Review your details before finishing.'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        <div style={{ height: 3, background: 'var(--muted)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${(step / total) * 100}%`,
            background: 'var(--primary)', borderRadius: 999,
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Step content */}
        {step === 1 && (
          <div style={{ display: 'grid', gap: 12 }}>
            <Field label="Email" id="wz-email" type="email" placeholder="you@example.com" />
            <Field label="Password" id="wz-pw" type="password" placeholder="Min. 8 characters" />
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'grid', gap: 12 }}>
            <Field label="Display name" id="wz-name" placeholder="Alex Johnson" />
            <Field label="Username" id="wz-user" placeholder="@alexjohnson" />
          </div>
        )}
        {step === 3 && (
          <div style={{
            padding: '14px 16px', background: 'var(--muted)', borderRadius: 'var(--radius-sm)',
            fontSize: 14, lineHeight: 1.6, color: 'var(--muted-foreground)',
          }}>
            Review your information. Click <strong style={{ color: 'var(--foreground)' }}>Finish</strong> to create your account.
          </div>
        )}

        <DialogFooter>
          {step > 1 ? (
            <Button variant="outline" color="neutral" onClick={() => setStep((s) => s - 1)}>Back</Button>
          ) : (
            <DialogClose asChild>
              <Button variant="outline" color="neutral">Cancel</Button>
            </DialogClose>
          )}
          {step < total ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <DialogClose asChild>
              <Button>Finish</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   10. NESTED DIALOG
   ================================================================ */

export function NestedDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" color="destructive">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete your account</DialogTitle>
          <DialogDescription>
            This will remove all your projects, data, and team memberships. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="neutral">Cancel</Button>
          </DialogClose>
          {/* Second dialog opens from within the first */}
          <Dialog>
            <DialogTrigger asChild>
              <Button color="destructive">Continue</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This is permanent and irreversible. Type <strong>DELETE</strong> to confirm.
                </DialogDescription>
              </DialogHeader>
              <Field label="" id="nd-confirm" placeholder='Type "DELETE" to confirm' />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" color="neutral">Go back</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button color="destructive">Delete permanently</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ================================================================
   11. STACKED ACTIONS (mobile action sheet style)
   ================================================================ */

const ACTIONS = [
  { label: 'Copy link',        desc: 'Copy the share URL to clipboard' },
  { label: 'Share via email',  desc: 'Send an invite to a teammate'    },
  { label: 'Download as PDF',  desc: 'Export a printable version'      },
]

export function StackedActionsPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent size="sm" className="p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Share options</DialogTitle>
        <div>
          {ACTIONS.map((action) => (
            <DialogClose key={action.label} asChild>
              <button
                style={{
                  display: 'flex', flexDirection: 'column', gap: 3,
                  width: '100%', padding: '14px 20px', textAlign: 'left',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)', fontFamily: 'inherit',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>{action.label}</span>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{action.desc}</span>
              </button>
            </DialogClose>
          ))}
          <DialogClose asChild>
            <button
              style={{
                display: 'block', width: '100%', padding: '14px 20px', textAlign: 'center',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                color: 'var(--muted-foreground)', transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Cancel
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
