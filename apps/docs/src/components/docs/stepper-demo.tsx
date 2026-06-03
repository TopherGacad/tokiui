'use client'

import * as React from 'react'
import { Button } from '@tokiui/ui'
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC HORIZONTAL
   ================================================================ */

const STEPS = [
  { title: 'Account',  description: 'Your details'     },
  { title: 'Profile',  description: 'Customise profile' },
  { title: 'Review',   description: 'Confirm & submit'  },
]

export function StepperBasicPreview() {
  const [step, setStep] = React.useState(1)

  return (
    <div className="w-full max-w-lg space-y-6">
      <Stepper step={step} className="w-full">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <StepperItem step={i + 1}>
              <StepperIndicator />
              <StepperContent>
                <StepperTitle>{s.title}</StepperTitle>
                <StepperDescription>{s.description}</StepperDescription>
              </StepperContent>
            </StepperItem>
            {i < STEPS.length - 1 && <StepperSeparator />}
          </React.Fragment>
        ))}
      </Stepper>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={step === STEPS.length}
          onClick={() => setStep((s) => s + 1)}
        >
          {step === STEPS.length ? 'Done' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

/* ================================================================
   2. VERTICAL
   ================================================================ */

const VERTICAL_STEPS = [
  { title: 'Create account',   description: 'Enter your email and password'         },
  { title: 'Verify email',     description: 'Check your inbox for a confirmation'   },
  { title: 'Set up workspace', description: 'Name your workspace and invite members' },
  { title: 'You\'re all set',  description: 'Start building with tokiui'            },
]

export function StepperVerticalPreview() {
  const [step, setStep] = React.useState(2)

  return (
    <div className="flex gap-8 items-start">
      <Stepper step={step} orientation="vertical" className="flex-1">
        {VERTICAL_STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <StepperItem step={i + 1}>
              <StepperIndicator />
              <StepperContent>
                <StepperTitle>{s.title}</StepperTitle>
                <StepperDescription>{s.description}</StepperDescription>
              </StepperContent>
            </StepperItem>
            {i < VERTICAL_STEPS.length - 1 && <StepperSeparator />}
          </React.Fragment>
        ))}
      </Stepper>

      <div className="flex flex-col gap-2 pt-1 shrink-0">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={step === VERTICAL_STEPS.length}
          onClick={() => setStep((s) => s + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

/* ================================================================
   3. WITH CUSTOM ICONS
   ================================================================ */

function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function IconCreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

function IconShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

const ICON_STEPS = [
  { title: 'Identity',  description: 'Verify who you are',    icon: <IconUser className="size-4" />       },
  { title: 'Payment',   description: 'Add a payment method',  icon: <IconCreditCard className="size-4" /> },
  { title: 'Confirm',   description: 'Review and confirm',    icon: <IconShieldCheck className="size-4" />},
]

export function StepperIconPreview() {
  const [step, setStep] = React.useState(2)

  return (
    <div className="w-full max-w-lg space-y-6">
      <Stepper step={step} className="w-full">
        {ICON_STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <StepperItem step={i + 1}>
              <StepperIndicator icon={s.icon} />
              <StepperContent>
                <StepperTitle>{s.title}</StepperTitle>
                <StepperDescription>{s.description}</StepperDescription>
              </StepperContent>
            </StepperItem>
            {i < ICON_STEPS.length - 1 && <StepperSeparator />}
          </React.Fragment>
        ))}
      </Stepper>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>Back</Button>
        <Button size="sm" disabled={step === ICON_STEPS.length} onClick={() => setStep((s) => s + 1)}>Next</Button>
      </div>
    </div>
  )
}

/* ================================================================
   4. REAL-WORLD: ONBOARDING WIZARD
   ================================================================ */

const WIZARD_STEPS = ['Plan', 'Team', 'Billing', 'Launch']

const WIZARD_CONTENT: Record<number, React.ReactNode> = {
  1: (
    <div className="space-y-3">
      <p className="text-sm font-medium">Choose a plan</p>
      <div className="grid grid-cols-2 gap-2">
        {['Starter', 'Pro', 'Team', 'Enterprise'].map((plan) => (
          <div key={plan} className={`rounded-lg border px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-muted ${plan === 'Pro' ? 'border-primary bg-primary/5' : 'border-border'}`}>
            {plan}
          </div>
        ))}
      </div>
    </div>
  ),
  2: (
    <div className="space-y-3">
      <p className="text-sm font-medium">Invite team members</p>
      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        teammate@company.com
      </div>
      <Button variant="outline" size="sm">+ Add another</Button>
    </div>
  ),
  3: (
    <div className="space-y-3">
      <p className="text-sm font-medium">Payment method</p>
      <div className="rounded-lg border border-border px-4 py-3 text-sm flex items-center gap-3">
        <div className="w-8 h-5 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">VISA</div>
        <span className="text-muted-foreground">•••• •••• •••• 4242</span>
        <span className="ml-auto text-xs text-muted-foreground">12/26</span>
      </div>
    </div>
  ),
  4: (
    <div className="space-y-3">
      <p className="text-sm font-medium">Ready to launch</p>
      <p className="text-sm text-muted-foreground">Everything looks good. Your workspace will be live in seconds.</p>
    </div>
  ),
}

export function StepperWizardPreview() {
  const [step, setStep] = React.useState(1)
  const isLast = step === WIZARD_STEPS.length

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-6 py-5">
        <Stepper step={step} className="w-full">
          {WIZARD_STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <StepperItem step={i + 1} className="shrink-0">
                <StepperIndicator />
              </StepperItem>
              {i < WIZARD_STEPS.length - 1 && <StepperSeparator />}
            </React.Fragment>
          ))}
        </Stepper>
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Step {step} of {WIZARD_STEPS.length}</p>
          <p className="text-base font-semibold mt-0.5">{WIZARD_STEPS[step - 1]}</p>
        </div>
      </div>

      <div className="px-6 py-5 min-h-[140px]">
        {WIZARD_CONTENT[step]}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-6 py-4">
        <Button variant="ghost" size="sm" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button size="sm" onClick={() => !isLast && setStep((s) => s + 1)}>
          {isLast ? 'Launch workspace' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}
