'use client'

import { useState, useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { Header } from '@/components/site/header'
import { ThemeEditor } from '@/components/playground/theme-editor'
import { ComponentShowcase } from '@/components/playground/component-showcase'
import { Button } from '@tokiui/ui'
import { encodeTheme, tokensToCssVars } from '@/lib/theme/encode'
import { decodeTheme } from '@/lib/theme/decode'
import { defaultTheme } from '@/lib/theme/presets'
import type { ThemeTokens } from '@/lib/theme/types'

const STORAGE_KEY = 'tokiui-playground-theme'

export function PlaygroundContent() {
  const [themeParam, setThemeParam] = useQueryState('theme')
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [fontFamily, setFontFamily] = useState('ui-sans-serif, system-ui, sans-serif')
  const [lightTokens, setLightTokens] = useState<ThemeTokens>(
    defaultTheme.light as ThemeTokens
  )
  const [darkTokens, setDarkTokens] = useState<ThemeTokens>(
    defaultTheme.dark as ThemeTokens
  )
  const [copied, setCopied] = useState<'url' | 'css' | null>(null)

  useEffect(() => {
    if (themeParam) {
      const decoded = decodeTheme(themeParam)
      if (decoded) {
        setLightTokens(decoded.light)
        setDarkTokens(decoded.dark)
        return
      }
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const decoded = decodeTheme(stored)
      if (decoded) {
        setLightTokens(decoded.light)
        setDarkTokens(decoded.dark)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, encodeTheme(lightTokens, darkTokens))
  }, [lightTokens, darkTokens])

  function updateLight(key: keyof ThemeTokens, value: string) {
    setLightTokens((prev) => ({ ...prev, [key]: value }))
  }

  function updateDark(key: keyof ThemeTokens, value: string) {
    setDarkTokens((prev) => ({ ...prev, [key]: value }))
  }

  async function copyThemeUrl() {
    const encoded = encodeTheme(lightTokens, darkTokens)
    await setThemeParam(encoded)
    await navigator.clipboard.writeText(window.location.href)
    setCopied('url')
    setTimeout(() => setCopied(null), 2000)
  }

  async function copyCssVars() {
    const lightVars = tokensToCssVars(lightTokens)
    const darkVars = tokensToCssVars(darkTokens)
    const css = [
      ':root {',
      ...Object.entries(lightVars).map(([k, v]) => `  ${k}: ${v};`),
      '}',
      '[data-theme="dark"] {',
      ...Object.entries(darkVars).map(([k, v]) => `  ${k}: ${v};`),
      '}',
    ].join('\n')
    await navigator.clipboard.writeText(css)
    setCopied('css')
    setTimeout(() => setCopied(null), 2000)
  }

  const activeTokens = mode === 'light' ? lightTokens : darkTokens
  const activeVars = tokensToCssVars(activeTokens)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="w-full shrink-0 overflow-y-auto border-b bg-background p-4 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-semibold">Playground</h1>
            <div className="flex gap-1 rounded-md border p-0.5 text-xs">
              {(['light', 'dark'] as const).map((m) => (
                <button
                  key={m}
                  className={`rounded px-2 py-1 capitalize transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() => setMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <ThemeEditor
            mode={mode}
            lightTokens={lightTokens}
            darkTokens={darkTokens}
            fontFamily={fontFamily}
            onLightChange={updateLight}
            onDarkChange={updateDark}
            onPresetSelect={(light, dark) => { setLightTokens(light); setDarkTokens(dark) }}
            onFontChange={setFontFamily}
          />
        </aside>

        <main className="flex flex-1 flex-col">
          <div className="flex items-center justify-end gap-2 border-b px-4 py-2">
            <Button variant="outline" size="sm" onClick={copyThemeUrl}>
              {copied === 'url' ? 'Copied!' : 'Copy theme URL'}
            </Button>
            <Button variant="outline" size="sm" onClick={copyCssVars}>
              {copied === 'css' ? 'Copied!' : 'Copy CSS variables'}
            </Button>
          </div>

          <div
            className={`flex-1 overflow-auto p-8 ${mode === 'dark' ? 'dark' : ''}`}
            style={{
              ...(activeVars as React.CSSProperties),
              fontFamily,
              backgroundColor: activeTokens.background,
              color: activeTokens.foreground,
            }}
          >
            <ComponentShowcase />
          </div>
        </main>
      </div>
    </div>
  )
}
