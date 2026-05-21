'use client'

import * as React from 'react'
import { Progress, Button } from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function ProgressBasicPreview() {
  return (
    <div className="w-full max-w-sm">
      <Progress value={60} />
    </div>
  )
}

/* ================================================================
   2. SIZES
   ================================================================ */

export function ProgressSizesPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <p className="text-xs font-mono text-muted-foreground">{size}</p>
          <Progress value={65} size={size} />
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   3. COLORS
   ================================================================ */

export function ProgressColorsPreview() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {(['default', 'success', 'warning', 'info', 'error'] as const).map((color) => (
        <div key={color} className="space-y-1">
          <p className="text-xs font-mono text-muted-foreground">{color}</p>
          <Progress value={70} color={color} />
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   4. STRIPED
   ================================================================ */

export function ProgressStripedPreview() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Progress value={40} variant="striped" />
      <Progress value={70} variant="striped" color="success" />
      <Progress value={55} variant="striped" color="info" size="lg" />
    </div>
  )
}

/* ================================================================
   5. INDETERMINATE
   ================================================================ */

export function ProgressIndeterminatePreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Progress variant="indeterminate" />
      <Progress variant="indeterminate" color="success" />
      <Progress variant="indeterminate" color="info" size="lg" />
    </div>
  )
}

/* ================================================================
   6. WITH LABEL
   ================================================================ */

export function ProgressLabelPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Progress value={30} showLabel />
      <Progress value={75} showLabel label="Storage used" color="success" />
      <Progress variant="indeterminate" showLabel label="Connecting…" color="info" />
    </div>
  )
}

/* ================================================================
   7. UPLOAD (interactive)
   ================================================================ */

export function ProgressUploadPreview() {
  const [value, setValue]   = React.useState(0)
  const [running, setRunning] = React.useState(false)

  React.useEffect(() => {
    if (!running) return
    if (value >= 100) { setRunning(false); return }
    const t = setTimeout(
      () => setValue((v) => Math.min(100, v + Math.random() * 12 + 4)),
      250,
    )
    return () => clearTimeout(t)
  }, [running, value])

  const isDone  = value === 100
  const color   = isDone ? 'success' : 'default'

  return (
    <div className="w-full max-w-sm space-y-3">
      <Progress
        value={value}
        color={color}
        showLabel
        label={isDone ? 'Upload complete' : 'project-report.pdf'}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => { setValue(0); setRunning(true) }}
          disabled={running}
        >
          {running ? 'Uploading…' : isDone ? 'Upload again' : 'Start upload'}
        </Button>
        {running && (
          <Button size="sm" variant="outline" onClick={() => setRunning(false)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

/* ================================================================
   8. MULTI-STEP
   ================================================================ */

export function ProgressStepsPreview() {
  const steps = ['Account', 'Profile', 'Billing', 'Review']
  const [step, setStep] = React.useState(1)
  const pct = (step / steps.length) * 100

  return (
    <div className="w-full max-w-sm space-y-4">
      <Progress
        value={pct}
        color="success"
        showLabel
        label={`Step ${step} of ${steps.length}: ${steps[step - 1]}`}
      />
      <div className="flex justify-between">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
          disabled={step === steps.length}
        >
          {step === steps.length ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
