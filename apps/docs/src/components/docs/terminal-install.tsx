'use client'

import { useState } from 'react'
import { useCopy } from '@/components/site/use-copy'
import { Icon } from '@/components/site/icons'

type PmId = 'cli' | 'npm' | 'pnpm' | 'yarn' | 'bun'

const PMS: { id: PmId; label: string }[] = [
  { id: 'cli',  label: 'tokiui' },
  { id: 'npm',  label: 'npm'    },
  { id: 'pnpm', label: 'pnpm'   },
  { id: 'yarn', label: 'yarn'   },
  { id: 'bun',  label: 'bun'    },
]

const GLYPHS: Record<PmId, string> = {
  cli: 'tu', npm: 'n', pnpm: 'p', yarn: 'y', bun: 'b',
}

interface Cmd { tool: string; flag: string; arg: string }

function buildCmd(pm: PmId, component: string): Cmd {
  if (pm === 'cli') return { tool: 'npx', flag: 'tokiui', arg: `add ${component}` }
  return { tool: pm, flag: pm === 'npm' ? 'install' : 'add', arg: '@tokiui/ui' }
}

export function TerminalInstall({ component }: { component: string }) {
  const [pm, setPm] = useState<PmId>('cli')
  const cmd = buildCmd(pm, component)
  const text = `${cmd.tool} ${cmd.flag} ${cmd.arg}`
  const [copied, copy] = useCopy(text)

  return (
    <div className="term">
      <div className="term__head">
        <span className="term__lights">
          <span className="term__light term__light--r" />
          <span className="term__light term__light--y" />
          <span className="term__light term__light--g" />
        </span>
        <span className="term__title">~/my-app</span>
        <div className="pm-tabs" role="tablist">
          {PMS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={pm === p.id}
              className={`pm-tab${pm === p.id ? ' is-active' : ''}`}
              onClick={() => setPm(p.id)}
            >
              <span className={`pm-glyph pm-glyph--${p.id}`}>{GLYPHS[p.id]}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="term__body">
        <span className="term__prompt">$</span>{' '}
        <span className="t-tool">{cmd.tool}</span>{' '}
        <span className="t-flag">{cmd.flag}</span>{' '}
        <span className="t-arg">{cmd.arg}</span>
        <button
          className={`term__copy${copied ? ' ok' : ''}`}
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy command'}
        >
          {copied ? <Icon.check /> : <Icon.copy />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
    </div>
  )
}
