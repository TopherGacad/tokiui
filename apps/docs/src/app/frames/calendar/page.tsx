import FramePage from '@/registry/frames/calendar/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Calendar' }

const FRAME = 'src/registry/frames/calendar'

export default async function CalendarFramePage() {
  const files = await getFrameSource([
    `${FRAME}/page.tsx`,
    `${FRAME}/month-view.tsx`,
    `${FRAME}/week-view.tsx`,
    `${FRAME}/day-view.tsx`,
    `${FRAME}/time-grid.tsx`,
    `${FRAME}/events.ts`,
    `${FRAME}/date-utils.ts`,
    `${FRAME}/icons.tsx`,
  ])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Calendar"
        files={files}
        deps={['calendar']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/calendar/ and wires a ready route at /calendar. Replace the demo data in events.ts (createSampleEvents) with your own — the views only need an array of CalendarEvent."
      />
    </>
  )
}
