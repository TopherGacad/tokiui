'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Badge } from '@tokiui/ui'

/* ================================================================
   1. DEFAULT (single)
   ================================================================ */

export function AccordionDefaultPreview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is tokiui?</AccordionTrigger>
        <AccordionContent>
          tokiui is a React component library built on Radix UI and Tailwind CSS v4. Components install as source code — you own them, customize them, and update on your schedule.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it require Radix UI?</AccordionTrigger>
        <AccordionContent>
          Partially. Primitive components like Dialog, Select, and Accordion are powered by Radix. Simpler components like Badge, Separator, and Skeleton have no Radix dependency.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I use it with any framework?</AccordionTrigger>
        <AccordionContent>
          tokiui works with any React framework — Next.js, Remix, Vite, or plain Create React App. Tailwind CSS v4 is required for styles.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/* ================================================================
   2. MULTIPLE
   ================================================================ */

export function AccordionMultiplePreview() {
  return (
    <Accordion type="multiple" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Shipping & delivery</AccordionTrigger>
        <AccordionContent>
          Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout. Free standard shipping on orders over $75.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Returns & refunds</AccordionTrigger>
        <AccordionContent>
          Items can be returned within 30 days of delivery. Refunds are processed within 5–7 business days after we receive the return.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          All products come with a 12-month limited warranty covering manufacturing defects. Damage from misuse is not covered.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/* ================================================================
   3. SEPARATED VARIANT
   ================================================================ */

export function AccordionSeparatedPreview() {
  return (
    <Accordion type="single" collapsible variant="separated" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          You are billed monthly on the date you first subscribed. Upgrade or downgrade at any time — changes take effect at the next billing cycle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
        <AccordionContent>
          Yes. Cancel from your account settings at any time. You keep access until the end of the billing period — no partial refunds.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
        <AccordionContent>
          Every plan includes a 14-day free trial. No credit card required to start.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/* ================================================================
   4. FLUSH VARIANT
   ================================================================ */

export function AccordionFlushPreview() {
  return (
    <Accordion type="single" collapsible variant="flush" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>General settings</AccordionTrigger>
        <AccordionContent>
          Update your display name, language preference, and timezone. Changes are saved automatically.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Choose which events send email or in-app notifications. You can silence all non-critical alerts with one toggle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy & security</AccordionTrigger>
        <AccordionContent>
          Manage active sessions, enable two-factor authentication, and control which third-party apps have access to your account.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/* ================================================================
   5. WITH BADGE (real-world — FAQ with tags)
   ================================================================ */

export function AccordionFAQPreview() {
  const faqs = [
    {
      value:    'q1',
      question: 'Is tokiui free to use?',
      tag:      'Licensing',
      tagColor: 'default' as const,
      answer:   'Yes. tokiui is open source under the MIT license. Use it in personal and commercial projects without restriction.',
    },
    {
      value:    'q2',
      question: 'How do I update a component after installing it?',
      tag:      'Updates',
      tagColor: 'info' as const,
      answer:   'Run the add command again — it will overwrite the existing file. Review the diff and merge any customizations you made manually.',
    },
    {
      value:    'q3',
      question: 'Can I customize the design tokens?',
      tag:      'Theming',
      tagColor: 'success' as const,
      answer:   'Absolutely. All colors, radii, shadows, and spacing values are CSS custom properties. Override them globally in your stylesheet or per-component via className.',
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      {faqs.map(({ value, question, tag, tagColor, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <Badge variant="soft" color={tagColor} size="sm">{tag}</Badge>
              {question}
            </span>
          </AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
