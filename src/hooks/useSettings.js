import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'portfolio-settings'

const DEFAULTS = {
  theme: 'default',
  fontSize: 'md',
  locale: 'es',
}

export const FONT_SIZES = {
  sm: 12,
  md: 13,
  lg: 14,
  xl: 16,
}

export const THEMES = {
  default: {
    name: 'Default',
    '--teal':           '#0D7A6B',
    '--teal-light':     '#0FA089',
    '--teal-dim':       'rgba(13, 122, 107, 0.15)',
    '--slate-dark':     '#1A1F2E',
    '--slate-mid':      '#161B2A',
    '--slate-light':    '#1E2538',
    '--border':         '#2D3748',
    '--border-dim':     'rgba(45, 55, 72, 0.4)',
    '--text-primary':   '#E2E8F0',
    '--text-secondary': '#CBD5E1',
    '--text-muted':     '#94A3B8',
    '--text-dim':       '#64748B',
    '--text-ghost':     '#475569',
    '--titlebar-bg':    '#141821',
    '--syntax-keyword': '#7C3AED',
    '--syntax-fn':      '#0FA089',
    '--syntax-string':  '#F59E0B',
    '--syntax-comment': '#475569',
    '--syntax-default': '#CBD5E1',
  },
  'dark-plus': {
    name: 'Dark+',
    '--teal':           '#007ACC',
    '--teal-light':     '#1B9EE0',
    '--teal-dim':       'rgba(0, 122, 204, 0.15)',
    '--slate-dark':     '#1E1E1E',
    '--slate-mid':      '#252526',
    '--slate-light':    '#2D2D2D',
    '--border':         '#3C3C3C',
    '--border-dim':     'rgba(60, 60, 60, 0.4)',
    '--text-primary':   '#D4D4D4',
    '--text-secondary': '#CCCCCC',
    '--text-muted':     '#9D9D9D',
    '--text-dim':       '#6D6D6D',
    '--text-ghost':     '#4D4D4D',
    '--titlebar-bg':    '#181818',
    '--syntax-keyword': '#569CD6',
    '--syntax-fn':      '#DCDCAA',
    '--syntax-string':  '#CE9178',
    '--syntax-comment': '#6A9955',
    '--syntax-default': '#D4D4D4',
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    '--teal':           '#61AFEF',
    '--teal-light':     '#78BEFF',
    '--teal-dim':       'rgba(97, 175, 239, 0.15)',
    '--slate-dark':     '#282C34',
    '--slate-mid':      '#21252B',
    '--slate-light':    '#2C313A',
    '--border':         '#3E4452',
    '--border-dim':     'rgba(62, 68, 82, 0.4)',
    '--text-primary':   '#ABB2BF',
    '--text-secondary': '#9DA5B4',
    '--text-muted':     '#7F848E',
    '--text-dim':       '#5C6370',
    '--text-ghost':     '#4B5263',
    '--titlebar-bg':    '#21252B',
    '--syntax-keyword': '#C678DD',
    '--syntax-fn':      '#61AFEF',
    '--syntax-string':  '#98C379',
    '--syntax-comment': '#5C6370',
    '--syntax-default': '#ABB2BF',
  },
  dracula: {
    name: 'Dracula',
    '--teal':           '#BD93F9',
    '--teal-light':     '#CDA6FA',
    '--teal-dim':       'rgba(189, 147, 249, 0.15)',
    '--slate-dark':     '#282A36',
    '--slate-mid':      '#21222C',
    '--slate-light':    '#2D2F3F',
    '--border':         '#44475A',
    '--border-dim':     'rgba(68, 71, 90, 0.4)',
    '--text-primary':   '#F8F8F2',
    '--text-secondary': '#CFCFCF',
    '--text-muted':     '#9B9EA8',
    '--text-dim':       '#6272A4',
    '--text-ghost':     '#44475A',
    '--titlebar-bg':    '#1E1F29',
    '--syntax-keyword': '#FF79C6',
    '--syntax-fn':      '#50FA7B',
    '--syntax-string':  '#F1FA8C',
    '--syntax-comment': '#6272A4',
    '--syntax-default': '#F8F8F2',
  },
  'github-dark': {
    name: 'GitHub Dark',
    '--teal':           '#58A6FF',
    '--teal-light':     '#79BAFF',
    '--teal-dim':       'rgba(88, 166, 255, 0.15)',
    '--slate-dark':     '#0D1117',
    '--slate-mid':      '#161B22',
    '--slate-light':    '#21262D',
    '--border':         '#30363D',
    '--border-dim':     'rgba(48, 54, 61, 0.4)',
    '--text-primary':   '#E6EDF3',
    '--text-secondary': '#C9D1D9',
    '--text-muted':     '#8B949E',
    '--text-dim':       '#6E7681',
    '--text-ghost':     '#484F58',
    '--titlebar-bg':    '#010409',
    '--syntax-keyword': '#FF7B72',
    '--syntax-fn':      '#D2A8FF',
    '--syntax-string':  '#A5D6FF',
    '--syntax-comment': '#8B949E',
    '--syntax-default': '#E6EDF3',
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    '--teal':           '#7AA2F7',
    '--teal-light':     '#91B4F8',
    '--teal-dim':       'rgba(122, 162, 247, 0.15)',
    '--slate-dark':     '#1A1B2E',
    '--slate-mid':      '#16161E',
    '--slate-light':    '#1F2335',
    '--border':         '#292E42',
    '--border-dim':     'rgba(41, 46, 66, 0.4)',
    '--text-primary':   '#C0CAF5',
    '--text-secondary': '#A9B1D6',
    '--text-muted':     '#787C99',
    '--text-dim':       '#565F89',
    '--text-ghost':     '#3B4261',
    '--titlebar-bg':    '#13131E',
    '--syntax-keyword': '#BB9AF7',
    '--syntax-fn':      '#7AA2F7',
    '--syntax-string':  '#9ECE6A',
    '--syntax-comment': '#565F89',
    '--syntax-default': '#C0CAF5',
  },
  'nord': {
    name: 'Nord',
    '--teal':           '#88C0D0',
    '--teal-light':     '#9ECFDE',
    '--teal-dim':       'rgba(136, 192, 208, 0.15)',
    '--slate-dark':     '#2E3440',
    '--slate-mid':      '#3B4252',
    '--slate-light':    '#434C5E',
    '--border':         '#4C566A',
    '--border-dim':     'rgba(76, 86, 106, 0.4)',
    '--text-primary':   '#ECEFF4',
    '--text-secondary': '#E5E9F0',
    '--text-muted':     '#D8DEE9',
    '--text-dim':       '#9AA3B2',
    '--text-ghost':     '#616E88',
    '--titlebar-bg':    '#242932',
    '--syntax-keyword': '#81A1C1',
    '--syntax-fn':      '#88C0D0',
    '--syntax-string':  '#A3BE8C',
    '--syntax-comment': '#616E88',
    '--syntax-default': '#ECEFF4',
  },
  'solarized-dark': {
    name: 'Solarized Dark',
    '--teal':           '#268BD2',
    '--teal-light':     '#3A9EE5',
    '--teal-dim':       'rgba(38, 139, 210, 0.15)',
    '--slate-dark':     '#002B36',
    '--slate-mid':      '#073642',
    '--slate-light':    '#0A3F4D',
    '--border':         '#1A4F5E',
    '--border-dim':     'rgba(26, 79, 94, 0.4)',
    '--text-primary':   '#FDF6E3',
    '--text-secondary': '#EEE8D5',
    '--text-muted':     '#93A1A1',
    '--text-dim':       '#657B83',
    '--text-ghost':     '#586E75',
    '--titlebar-bg':    '#001E27',
    '--syntax-keyword': '#859900',
    '--syntax-fn':      '#268BD2',
    '--syntax-string':  '#2AA198',
    '--syntax-comment': '#586E75',
    '--syntax-default': '#FDF6E3',
  },
  'monokai': {
    name: 'Monokai',
    '--teal':           '#A6E22E',
    '--teal-light':     '#B8F040',
    '--teal-dim':       'rgba(166, 226, 46, 0.15)',
    '--slate-dark':     '#272822',
    '--slate-mid':      '#1E1F1C',
    '--slate-light':    '#2D2E27',
    '--border':         '#3E3D32',
    '--border-dim':     'rgba(62, 61, 50, 0.4)',
    '--text-primary':   '#F8F8F2',
    '--text-secondary': '#CFCFC2',
    '--text-muted':     '#908F82',
    '--text-dim':       '#75715E',
    '--text-ghost':     '#49483E',
    '--titlebar-bg':    '#1A1B16',
    '--syntax-keyword': '#F92672',
    '--syntax-fn':      '#A6E22E',
    '--syntax-string':  '#E6DB74',
    '--syntax-comment': '#75715E',
    '--syntax-default': '#F8F8F2',
  },
}

function loadSettings() {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

function applyTheme(themeName) {
  const theme = THEMES[themeName] ?? THEMES.default
  const root = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    if (key !== 'name') root.style.setProperty(key, value)
  })
}

function applyFontSize(size) {
  document.documentElement.style.fontSize = `${FONT_SIZES[size]}px`
}

function getInitialSettings() {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

export function useSettings() {
  // Inicialización lazy — lee localStorage una sola vez al montar, sin efecto
  const [settings, setSettings] = useState(getInitialSettings)

  // Aplica al DOM cuando cambia tema o fuente — dependencias explícitas y correctas
  useEffect(() => {
    applyTheme(settings.theme)
    applyFontSize(settings.fontSize)
  }, [settings.theme, settings.fontSize])

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates }

      // Aplicar cambios al DOM
      if (updates.theme)    applyTheme(updates.theme)
      if (updates.fontSize) applyFontSize(updates.fontSize)

      // Persistir en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

      return next
    })
  }, [])

  const setTheme    = useCallback((theme)    => updateSettings({ theme }),    [updateSettings])
  const setFontSize = useCallback((fontSize) => updateSettings({ fontSize }), [updateSettings])
  const setLocale   = useCallback((locale)   => updateSettings({ locale }),   [updateSettings])

  return {
    settings,
    setTheme,
    setFontSize,
    setLocale,
    themes: THEMES,
    fontSizes: FONT_SIZES,
  }
}