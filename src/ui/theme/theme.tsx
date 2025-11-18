'use client'
import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react'
import { colorVarsToDarken, themes } from './themes'
import { getDarkenAmount, darkenToRgba } from './darkenUtils'

/* -------------------------------------------------------------------------- */
/*                                 TYPES                                      */
/* -------------------------------------------------------------------------- */
export type ThemeVariant = 'standard' | 'minimal'

export type ThemeName =
  | 'light'
  | 'dark'
  | 'dark-blue'
  | 'light-gray'
  | 'pastel-green'
  | 'warm-orange'
  | 'frosted-glass'
  | 'midnight-purple'
  | 'cyber-metal'

interface ThemeConfig {
  [key: string]: any
}

interface Variable {
  name: string
  value: any
}

interface ProjectData {
  theme_config?: {
    colors?: Record<string, string>
    typography?: Record<string, string>
    [key: string]: any
  }
  components?: Record<string, any>
  default_variation?: ThemeVariant
  variables?: Variable[]
  name?: string
  project_id?: string
  version?: number
  updated_at?: string
}

interface ThemeProviderProps {
  theme: ThemeName
  projectId: string
  funcss?: string
  minHeight?: string
  children: ReactNode
}

/* -------------------------------------------------------------------------- */
/*                              THEME CONTEXT                                 */
/* -------------------------------------------------------------------------- */
interface ThemeContextType {
  variant: ThemeVariant
  setVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>
  themeConfig: ThemeConfig
  projectData: ProjectData | null
  isLoading: boolean
  isInitialLoad: boolean
  error: string | null
}

const ThemeContext = createContext<ThemeContextType>({
  variant: 'standard',
  setVariant: () => {},
  themeConfig: {},
  projectData: null,
  isLoading: true,
  isInitialLoad: true,
  error: null,
})

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const useVariant = () => {
  const { variant, setVariant } = useTheme()
  return { variant, setVariant }
}

/* -------------------------------------------------------------------------- */
/*                          LOCAL FILE MANAGEMENT                             */
/* -------------------------------------------------------------------------- */

const loadLocalTheme = async (): Promise<ProjectData | null> => {
  try {
    const response = await fetch('/funui.json', {
      cache: 'no-cache',
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Loaded theme from local file')
      return data
    }
  } catch (error) {
    console.log('No local theme file found')
  }
  return null
}

/* -------------------------------------------------------------------------- */
/*                          CDN THEME LOADER                                  */
/* -------------------------------------------------------------------------- */

const loadThemeFromCDN = async (projectId: string): Promise<ProjectData | null> => {
  // Try Firebase Storage public URL
  try {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/themes%2F${projectId}.json?alt=media`
    
    const response = await fetch(publicUrl, {
      cache: 'no-cache',
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Loaded theme from Firebase Storage CDN')
      return data
    } else {
      console.error('Firebase Storage fetch failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error loading from Firebase Storage:', error)
  }

  return null
}

/* -------------------------------------------------------------------------- */
/*                          CSS VARIABLE APPLIER                              */
/* -------------------------------------------------------------------------- */

const applyTypographyVariables = (typography: Record<string, string>, root: HTMLElement) => {
  if (!typography) return

  Object.entries(typography).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/_/g, '-')}`
    root.style.setProperty(cssVarName, value)
  })
}

const applyColorVariables = (colors: Record<string, string>, root: HTMLElement) => {
  if (!colors) return

  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/_/g, '-')}`
    root.style.setProperty(cssVarName, value)
  })
}

const applyThemeConfig = (themeConfig: Record<string, any>, root: HTMLElement) => {
  if (!themeConfig) return

  if (themeConfig.colors) {
    applyColorVariables(themeConfig.colors, root)
  }

  if (themeConfig.typography) {
    applyTypographyVariables(themeConfig.typography, root)
  }

  Object.entries(themeConfig).forEach(([key, value]) => {
    if (key !== 'colors' && key !== 'typography' && typeof value === 'string') {
      const cssVarName = `--${key.replace(/_/g, '-')}`
      root.style.setProperty(cssVarName, value)
    }
  })
}

/* -------------------------------------------------------------------------- */
/*                          VARIABLES HELPER                                  */
/* -------------------------------------------------------------------------- */

let cachedProjectData: ProjectData | null = null

export const getVariable = (name: string): { name: string; value: any } | undefined => {
  if (!cachedProjectData?.variables) {
    console.warn('No variables available. Make sure ThemeProvider is mounted.')
    return undefined
  }

  const variable = cachedProjectData.variables.find(v => v.name === name)
  return variable
}

export const getAllVariables = (): Variable[] => {
  return cachedProjectData?.variables || []
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
  funcss = '',
  minHeight = '100vh',
  projectId,
}) => {
  const [variant, setVariant] = useState<ThemeVariant>('standard')
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({})
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentVersion, setCurrentVersion] = useState<number | null>(null)

  /* -------------------------- Apply base theme --------------------------- */
  useEffect(() => {
    const root = document.documentElement
    const selectedTheme = themes[theme] || themes.light

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    if (
      ['dark', 'dark-blue', 'midnight-purple', 'cyber-metal'].includes(theme)
    ) {
      colorVarsToDarken.forEach((varName) => {
        const original = getComputedStyle(root)
          .getPropertyValue(varName)
          .trim()
        if (original) {
          const darkAmount = getDarkenAmount(varName)
          const rgba = darkenToRgba(original, darkAmount, 0.9)
          root.style.setProperty(varName, rgba)
        }
      })
    }
  }, [theme])

  /* ---------------------- CDN Theme Sync with Local File ----------------------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !projectId) {
      setIsLoading(false)
      setIsInitialLoad(false)
      return
    }

    const root = document.documentElement
    let pollTimer: NodeJS.Timeout

    const syncTheme = async () => {
      try {
        // Load local theme
        const localTheme = await loadLocalTheme()
        const localVersion = localTheme?.version || 0

        // Load CDN theme
        const cdnTheme = await loadThemeFromCDN(projectId)
        const cdnVersion = cdnTheme?.version || 0

        if (cdnTheme) {
          // Compare versions and use the newer one
          if (cdnVersion !== localVersion) {
            console.log(`🔄 Version mismatch: Local(${localVersion}) vs CDN(${cdnVersion})`)
            console.log('ℹ️ Using CDN version. Please update your local funui.json file manually.')
          }
          
          // Always use CDN theme if available
          if (!currentVersion || cdnVersion !== currentVersion) {
            applyThemeData(cdnTheme, root)
            setCurrentVersion(cdnVersion)
            console.log('✅ Theme loaded from CDN')
          } else {
            console.log('✓ Theme up to date')
          }
          
          setError(null)
        } else if (localTheme) {
          // CDN not available but we have local
          console.log('⚠️ Using local theme (CDN unavailable)')
          applyThemeData(localTheme, root)
          setCurrentVersion(localVersion)
          setError(null)
        } else {
          // No theme available anywhere
          console.warn('⚠️ No theme found')
          setError('Theme not found')
        }
      } catch (err) {
        console.error('Error syncing theme:', err)
        setError('Failed to sync theme')
      } finally {
        setIsLoading(false)
        setIsInitialLoad(false)
      }
    }

    // Initial sync
    syncTheme()

    // Poll for updates every 5 minutes
    pollTimer = setInterval(() => {
      syncTheme()
    }, 5 * 60 * 1000)

    return () => {
      clearInterval(pollTimer)
    }
  }, [projectId, currentVersion])

  const applyThemeData = (data: ProjectData, root: HTMLElement) => {
    const themeConfig = data.theme_config ?? {}
    const newVariant = data.default_variation || 'standard'

    setVariant(newVariant)
    setThemeConfig(themeConfig)
    setProjectData(data)
    
    // Cache for variable access
    cachedProjectData = data

    // Apply all theme config to CSS variables
    applyThemeConfig(themeConfig, root)
  }

  const contextValue = useMemo(
    () => ({
      variant,
      setVariant,
      themeConfig,
      projectData,
      isLoading,
      isInitialLoad,
      error,
    }),
    [variant, themeConfig, projectData, isLoading, isInitialLoad, error]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={`theme-${theme} ${funcss}`}
        style={{
          backgroundColor: 'var(--page-bg)',
          color: 'var(--text-color)',
          minHeight: minHeight,
          transition: isInitialLoad ? 'none' : 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

/* -------------------------------------------------------------------------- */
/*                              HELPER HOOKS                                  */
/* -------------------------------------------------------------------------- */

export const useThemeValue = (key: string): string | undefined => {
  const { themeConfig } = useTheme()
  return themeConfig[key]
}

export const useComponentConfig = (componentName: string): any => {
  const { projectData } = useTheme()
  return projectData?.components?.[componentName] || {}
}

export const useColors = (): Record<string, string> => {
  const { projectData } = useTheme()
  return projectData?.theme_config?.colors || {}
}

export const useTypography = (): Record<string, string> => {
  const { projectData } = useTheme()
  return projectData?.theme_config?.typography || {}
}

export const useThemeConfig = (): Record<string, any> => {
  const { projectData } = useTheme()
  return projectData?.theme_config || {}
}

export const useProjectData = (): ProjectData | null => {
  const { projectData } = useTheme()
  return projectData
}

export const useColor = (colorName: string): string | undefined => {
  const colors = useColors()
  return colors[colorName]
}

export const useTypographyValue = (property: string): string | undefined => {
  const typography = useTypography()
  return typography[property]
}

export const useComponentVariant = (componentName: string, variantName: string = 'default'): any => {
  const componentConfig = useComponentConfig(componentName)
  return componentConfig[variantName] || {}
}

// Hook to access variables
export const useVariables = (): Variable[] => {
  const { projectData } = useTheme()
  return projectData?.variables || []
}

// Hook to get a specific variable
export const useVariable = (name: string): any => {
  const variables = useVariables()
  const variable = variables.find(v => v.name === name)
  return variable?.value
}