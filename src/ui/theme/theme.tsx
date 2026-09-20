'use client'
import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
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

// Bucket Types
export interface BucketField {
  name: string
  label: string
  type: string
  required?: boolean
  options?: string[]
  min?: number
  max?: number
  multiple?: boolean
}

export interface Bucket {
  id: string
  name: string
  displayName: string
  category?: string
  fields: BucketField[]
  createdBy: string
  createdAt: number
  updatedAt: number
  updatedBy: string
  recordCount: number
  jsonFilesCount: number
  totalRecordsInJson: number
  lastJsonExport?: number
  userId?: string
  createdAtString?: string
  updatedAtString?: string
}

export interface BucketRecord {
  id: string
  values: Record<string, any>
  createdBy: string
  createdAt: number
  updatedAt: number
  updatedBy: string
}

export interface JsonFileMetadata {
  page: number
  totalPages: number
  recordsInPage: number
  totalRecords: number
  exportedAt: string
  recordsPerFile: number
  projectId: string
  bucketId: string
  bucketName: string
}

export interface JsonFileData {
  metadata: JsonFileMetadata
  records: BucketRecord[]
}

export interface JsonFileInfo {
  name: string
  fullPath: string
  url: string
  size: number
  page: number
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
  assets?: Asset[]
  buckets?: any[]
  name?: string
  project_id?: string
  version?: number
  updated_at?: string
  trustedDomains?: Array<{
    domain: string
    status: string
    isDefault?: boolean
  }>
}

interface ThemeProviderProps {
  theme: ThemeName
  projectId?: string
  funcss?: string
  minHeight?: string
  children: ReactNode
  project?: ProjectData | null
  projectFile?: File | null // New prop: accept a project file
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
  projectId?: string
}

const ThemeContext = createContext<ThemeContextType>({
  variant: 'standard',
  setVariant: () => {},
  themeConfig: {},
  projectData: null,
  isLoading: true,
  isInitialLoad: true,
  error: null,
  projectId: undefined,
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
/*                          GLOBAL PROJECT ID                                 */
/* -------------------------------------------------------------------------- */

// Global variable to store the project ID
let globalProjectId: string | null = null

// Function to set the global project ID
export const setGlobalProjectId = (id: string): void => {
  globalProjectId = id
  console.log(`🌍 Global project ID set to: ${id}`)
}

// Function to get the global project ID
export const getGlobalProjectId = (): string | null => {
  return globalProjectId
}

// Function to clear the global project ID
export const clearGlobalProjectId = (): void => {
  globalProjectId = null
  console.log('🌍 Global project ID cleared')
}

// Function to read project ID from a file
const readProjectIdFromFile = async (file: File): Promise<string | null> => {
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    
    // Check for project_id field
    if (data.project_id) {
      return data.project_id
    }
    
    // Also check for projectId (camelCase)
    if (data.projectId) {
      return data.projectId
    }
    
    console.warn('⚠️ Project file does not contain a project_id field')
    return null
    
  } catch (error) {
    console.error('❌ Error reading project file:', error)
    return null
  }
}

/* -------------------------------------------------------------------------- */
/*                          ORIGIN VALIDATION                                 */
/* -------------------------------------------------------------------------- */

const getCurrentOrigin = (): string => {
  if (typeof window === 'undefined') return ''
  
  // For local development, return localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'localhost'
  }
  
  // For production, return the domain without protocol and www
  let domain = window.location.hostname
  domain = domain.replace(/^www\./, '')
  return domain
}

const validateOriginAccess = async (projectId: string): Promise<boolean> => {
  if (!projectId) {
    console.error('❌ No project ID provided for origin validation')
    return false
  }

  const currentOrigin = getCurrentOrigin()
  console.log(`🔍 Validating origin access for: ${currentOrigin}`)

  try {
    // Load project data from CDN to check trusted domains
    const projectData = await loadThemeFromCDN(projectId)
    
    if (!projectData) {
      console.error('❌ Project not found or inaccessible')
      return false
    }

    const trustedDomains = projectData.trustedDomains || []
    
    // Check if current origin is in trusted domains
    const hasAccess = trustedDomains.some(domain => {
      const trustedDomain = domain.domain.toLowerCase()
      const currentDomain = currentOrigin.toLowerCase()
      
      // Exact match or subdomain match
      return currentDomain === trustedDomain || 
             currentDomain.endsWith('.' + trustedDomain) ||
             (trustedDomain === 'localhost' && currentOrigin === 'localhost')
    })

    if (!hasAccess) {
      console.error(`❌ Access denied: Origin "${currentOrigin}" is not in trusted domains`)
      console.log('📋 Trusted domains:', trustedDomains.map(d => d.domain))
      return false
    }

    return true

  } catch (error) {
    console.error('❌ Error during origin validation:', error)
    return false
  }
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
      return data
    }
  } catch (error) {
    console.log('ℹ️ No local theme file found')
  }
  return null
}

/* -------------------------------------------------------------------------- */
/*                          CDN THEME LOADER                                  */
/* -------------------------------------------------------------------------- */

const loadThemeFromCDN = async (projectId: string): Promise<ProjectData | null> => {
  if (!projectId) {
    console.error('❌ No project ID provided for CDN loading')
    return null
  }

  // Try Firebase Storage public URL
  try {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/themes%2F${projectId}.json?alt=media`
    
    const response = await fetch(publicUrl, {
      cache: 'no-cache',
    })
    
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.error('❌ Firebase Storage fetch failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('❌ Error loading from Firebase Storage:', error)
  }

  return null
}

/* -------------------------------------------------------------------------- */
/*                          BUCKET JSON LOADER                                */
/* -------------------------------------------------------------------------- */

// Cache for JSON responses
const jsonFileCache = new Map<string, { data: JsonFileData; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Helper function to get cache key
const getCacheKey = (bucketSanitizedName: string, projectId: string, page: number): string => {
  return `${projectId}:${bucketSanitizedName}:${page}`
}

// Helper function to clean expired cache entries
const cleanExpiredCache = () => {
  const now = Date.now()
  for (const key of Array.from(jsonFileCache.keys())) {
    const entry = jsonFileCache.get(key) 
    if (entry && now - entry.timestamp > CACHE_DURATION) {
      jsonFileCache.delete(key)
    }
  }
  }

// Load JSON file with caching and performance optimizations
const loadBucketJsonFromCDN = async (
  bucketSanitizedName: string, 
  projectId: string, 
  page: number
): Promise<JsonFileData | null> => {
  if (!bucketSanitizedName || !projectId) {
    console.error('❌ Missing parameters for JSON loading')
    return null
  }

  // Clean expired cache entries periodically
  if (jsonFileCache.size > 100) { // Only clean when cache gets large
    cleanExpiredCache()
  }

  // Check cache first
  const cacheKey = getCacheKey(bucketSanitizedName, projectId, page)
  const cached = jsonFileCache.get(cacheKey)
  
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    console.log(`📦 Returning cached data for page ${page}`)
    return cached.data
  }

  try {
    // Construct the URL for JSON files
    const pageNumber = page.toString()
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2F${pageNumber}.json?alt=media`

    // Use AbortController for request timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(publicUrl, {
      cache: 'no-cache',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      const data = await response.json()
      
      // Cache the response
      jsonFileCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      })
      
      return data
    } else {
      // File might not exist (e.g., page out of range)
      return null
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`⏰ Timeout loading JSON file for page ${page}`)
    } else {
      console.error(`❌ Error loading JSON file for page ${page}:`, error)
    }
    return null
  }
}

// Parallel loading for multiple pages
const loadMultipleJsonPages = async (
  bucketSanitizedName: string, 
  projectId: string, 
  pages: number[]
): Promise<(JsonFileData | null)[]> => {
  try {
    const promises = pages.map(page => 
      loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
    )
    
    const results = await Promise.all(promises)
    return results.filter(Boolean) as JsonFileData[]
  } catch (error) {
    console.error('❌ Error loading multiple JSON pages:', error)
    return []
  }
}

const listBucketJsonFiles = async (
  bucketSanitizedName: string, 
  projectId: string
): Promise<JsonFileInfo[]> => {
  if (!bucketSanitizedName || !projectId) {
    console.error('❌ Missing parameters for listing JSON files')
    return []
  }

  try {
    const files: JsonFileInfo[] = []
    let page = 1
    let hasMoreFiles = true
    
    // Check multiple pages in parallel for faster discovery
    const batchSize = 5
    const pageChecks = []
    
    while (hasMoreFiles && page <= 100) {
      const batchPromises = []
      
      for (let i = 0; i < batchSize && page <= 100; i++) {
        const paddedPage = page.toString().padStart(3, '0')
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2Fpage_${paddedPage}.json?alt=media`
        
        batchPromises.push(
          fetch(publicUrl, {
            method: 'HEAD',
            cache: 'no-cache',
          })
        )
        page++
      }
      
      const responses = await Promise.all(batchPromises)
      
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].ok) {
          const currentPage = page - batchSize + i
          const paddedPage = currentPage.toString().padStart(3, '0')
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2Fpage_${paddedPage}.json?alt=media`
          
          files.push({
            name: `page_${paddedPage}.json`,
            fullPath: `projects/${projectId}/buckets/${bucketSanitizedName}/page_${paddedPage}.json`,
            url: publicUrl,
            size: parseInt(responses[i].headers.get('content-length') || '0', 10),
            page: currentPage
          })
        } else {
          hasMoreFiles = false
          break
        }
      }
    }
    
    return files
  } catch (error) {
    console.error('❌ Error listing JSON files:', error)
    return []
  }
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
/*                          BUCKET UTILITIES                                  */
/* -------------------------------------------------------------------------- */

// Cache for buckets and JSON files
let cachedBuckets: Bucket[] = []
let cachedJsonFiles: Record<string, JsonFileInfo[]> = {}
let cachedJsonData: Record<string, Record<number, JsonFileData>> = {}

const sanitizeBucketName = (name: string): string => {
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase()
}

const transformProjectBucket = (bucket: any, projectId: string): Bucket => {
  return {
    id: bucket.id || bucket._id || '',
    name: bucket.name || '',
    displayName: bucket.displayName || bucket.name || '',
    category: bucket.category || 'uncategorized',
    fields: Array.isArray(bucket.fields) ? bucket.fields : [],
    createdBy: bucket.createdBy || bucket.userId || '',
    createdAt: typeof bucket.createdAt === 'number' ? bucket.createdAt : Date.now(),
    updatedAt: typeof bucket.updatedAt === 'number' ? bucket.updatedAt : Date.now(),
    updatedBy: bucket.updatedBy || bucket.createdBy || '',
    recordCount: bucket.recordCount || 0,
    jsonFilesCount: bucket.jsonFilesCount || 0,
    totalRecordsInJson: bucket.totalRecordsInJson || 0,
    lastJsonExport: bucket.lastJsonExport,
    userId: bucket.userId,
    createdAtString: bucket.createdAt,
    updatedAtString: bucket.updatedAt
  }
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
  funcss = '',
  minHeight = '100vh',
  projectId: propProjectId,
  project: providedProject,
  projectFile,
}) => {
  const [variant, setVariant] = useState<ThemeVariant>('standard')
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({})
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentVersion, setCurrentVersion] = useState<number | null>(null)
  
  // Determine the actual project ID to use
  const [actualProjectId, setActualProjectId] = useState<string | undefined>(propProjectId)

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

  /* ---------------------- Theme Loading Logic ----------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      setIsInitialLoad(false)
      return
    }

    const root = document.documentElement
    let pollTimer: NodeJS.Timeout
const loadTheme = async () => {
  try {
    let finalTheme: ProjectData | null = null
    let finalVersion: number | null = null
    let finalProjectId: string | undefined = actualProjectId

    // First, check if we have a project file
    if (projectFile) {
      console.log('📁 Processing project file...')
      const fileProjectId = await readProjectIdFromFile(projectFile)
      
      if (fileProjectId) {
        // Set global project ID
        setGlobalProjectId(fileProjectId)
        setActualProjectId(fileProjectId)
        finalProjectId = fileProjectId
        console.log(`✅ Project ID from file: ${fileProjectId}`)
        
        // Read the full project data from the file
        const text = await projectFile.text()
        const fileData = JSON.parse(text)
        
        // Use the file data as the project data
        finalTheme = fileData
        finalVersion = fileData.version || 0
        
        // Apply theme immediately - fileData is guaranteed to be ProjectData here
        applyThemeData(fileData, root)
        setCurrentVersion(finalVersion)
        setError(null)
        setIsLoading(false)
        setIsInitialLoad(false)
        return // Skip all other loading logic
      } else {
        console.warn('⚠️ Project file does not contain a project_id')
      }
    }

    // If project data is provided directly, use it
    if (providedProject) {
      console.log('✅ Using provided project data directly')
      finalTheme = providedProject
      finalVersion = providedProject.version || 0
      finalProjectId = providedProject.project_id || propProjectId
      
      // Set global project ID if available
      if (finalProjectId) {
        setGlobalProjectId(finalProjectId)
        setActualProjectId(finalProjectId)
      }
      
      // Apply theme immediately - providedProject is guaranteed to be ProjectData here
      applyThemeData(providedProject, root)
      setCurrentVersion(finalVersion)
      setError(null)
      setIsLoading(false)
      setIsInitialLoad(false)
      return // Skip all other loading logic
    }

    // Otherwise, follow the normal loading flow
    // First, try to load local theme
    const localTheme = await loadLocalTheme()
    const localVersion = localTheme?.version || 0

    // Use actual project ID (could be from prop, file, or global)
    const projectIdToUse = finalProjectId || getGlobalProjectId() || propProjectId

    if (projectIdToUse) {
      // Validate origin access for CDN
      const hasAccess = await validateOriginAccess(projectIdToUse)
      
      if (hasAccess) {
        // Try to load from CDN
        const cdnTheme = await loadThemeFromCDN(projectIdToUse)
        const cdnVersion = cdnTheme?.version || 0

        if (cdnTheme) {
          // CDN theme available - use it
          finalTheme = cdnTheme
          finalVersion = cdnVersion
          
          if (cdnVersion !== localVersion) {
            console.log(`🔄 Version mismatch: Local(${localVersion}) vs CDN(${cdnVersion})`)
            console.log('ℹ️ Using CDN version. Please update your local funui.json file manually.')
          }

        } else if (localTheme) {
          // CDN not available but we have local theme
          console.log('⚠️ CDN unavailable, using local theme')
          finalTheme = localTheme
          finalVersion = localVersion
        } else {
          // No theme available anywhere
          console.warn('⚠️ No theme found (CDN unavailable and no local theme)')
          setError('Theme not found')
        }
      } else {
        // Origin validation failed
        if (localTheme) {
          console.log('⚠️ Origin validation failed, using local theme')
          finalTheme = localTheme
          finalVersion = localVersion
        } else {
          console.error('❌ Origin validation failed and no local theme available')
          setError('Access denied and no local theme available')
        }
      }
    } else {
      // No project ID provided - only use local theme
      console.log('ℹ️ No project ID provided, using local theme only')
      if (localTheme) {
        finalTheme = localTheme
        finalVersion = localVersion
        console.log('✅ Theme loaded from local file')
      } else {
        console.log('ℹ️ No local theme file found - using base theme only')
        // No error here - it's valid to use only base theme
      }
    }

    // Apply the theme if we have one
    // Check if finalTheme is not null before calling applyThemeData
    if (finalTheme && (!currentVersion || finalVersion !== currentVersion)) {
      // finalTheme is guaranteed to be ProjectData here because we checked it's not null
      applyThemeData(finalTheme, root)
      setCurrentVersion(finalVersion)
      setError(null)
    } else if (finalTheme) {
      console.log('✓ Theme up to date')
    }

  } catch (err) {
    console.error('❌ Error loading theme:', err)
    setError('Failed to load theme')
  } finally {
    setIsLoading(false)
    setIsInitialLoad(false)
  }
}

    // Only load theme if no project is provided
    if (!providedProject && !projectFile) {
      // Initial load
      loadTheme()

      // Only poll for updates if we have a project ID
      if (actualProjectId) {
        pollTimer = setInterval(() => {
          loadTheme()
        }, 5 * 60 * 1000)
      }

      return () => {
        if (pollTimer) {
          clearInterval(pollTimer)
        }
      }
    } else {
      // If project or file is provided, skip loading and set state directly
      console.log('✅ Using provided project data/file, skipping theme loading')
      if (providedProject) {
        applyThemeData(providedProject, document.documentElement)
        setCurrentVersion(providedProject.version || 0)
      }
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [propProjectId, actualProjectId, currentVersion, theme, providedProject, projectFile])

  const applyThemeData = (data: ProjectData, root: HTMLElement) => {
    const themeConfig = data.theme_config ?? {}
    const newVariant = data.default_variation || 'standard'
    const projectId = data.project_id || actualProjectId

    setVariant(newVariant)
    setThemeConfig(themeConfig)
    setProjectData(data)
    
    // Cache for variable access
    cachedProjectData = data
    
    // Cache for asset access
    cachedAssets = data.assets || []
    
    // Cache for bucket access
    const projectBuckets = data.buckets || []
    cachedBuckets = projectBuckets.map(bucket => 
      transformProjectBucket(bucket, projectId || '')
    )

    // Apply all theme config to CSS variables
    applyThemeConfig(themeConfig, root)
    
    // Update global project ID if available
    if (projectId) {
      setGlobalProjectId(projectId)
      setActualProjectId(projectId)
    }
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
      projectId: actualProjectId, // Use actual project ID in context
    }),
    [variant, themeConfig, projectData, isLoading, isInitialLoad, error, actualProjectId]
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

/* -------------------------------------------------------------------------- */
/*                              ASSETS HELPER                                 */
/* -------------------------------------------------------------------------- */

interface Asset {
  name: string
  url: string
  file_type: string
}

let cachedAssets: Asset[] = []

export const getAsset = (name: string): Asset | undefined => {
  if (!cachedAssets.length) {
    console.warn('No assets available. Make sure ThemeProvider is mounted.')
    return undefined
  }

  const asset = cachedAssets.find(a => a.name === name)
  return asset
}

export const getAllAssets = (): Asset[] => {
  return cachedAssets
}

export const getAssetValue = (name: string): string | undefined => {
  const asset = getAsset(name)
  return asset?.url
}

export const getAssetType = (name: string): string | undefined => {
  const asset = getAsset(name)
  return asset?.file_type
}

export const getAssetInfo = (name: string): { value: string; type: string; name: string } | undefined => {
  const asset = getAsset(name)
  if (!asset) return undefined
  
  return {
    value: asset.url,
    type: asset.file_type,
    name: asset.name
  }
}

// Hook to access all assets
export const useAssets = (): Asset[] => {
  const { projectData } = useTheme()
  return projectData?.assets || []
}

// Hook to get a specific asset
export const useAsset = (name: string): Asset | undefined => {
  const assets = useAssets()
  const asset = assets.find(a => a.name === name)
  return asset
}

// Hook to get asset URL (most common use case)
export const useAssetValue = (name: string): string | undefined => {
  const asset = useAsset(name)
  return asset?.url
}

// Hook to get asset type
export const useAssetType = (name: string): string | undefined => {
  const asset = useAsset(name)
  return asset?.file_type
}

// Hook to get complete asset info
export const useAssetInfo = (name: string): { value: string; type: string; name: string } | undefined => {
  const asset = useAsset(name)
  if (!asset) return undefined
  
  return {
    value: asset.url,
    type: asset.file_type,
    name: asset.name
  }
}

// Hook to filter assets by type
export const useAssetsByType = (type: string): Asset[] => {
  const assets = useAssets()
  return assets.filter(asset => asset.file_type === type)
}

// Hook to get image assets
export const useImageAssets = (): Asset[] => {
  return useAssetsByType('image')
}

// Hook to get video assets
export const useVideoAssets = (): Asset[] => {
  return useAssetsByType('video')
}

// Hook to get audio assets
export const useAudioAssets = (): Asset[] => {
  return useAssetsByType('audio')
}

// Hook to get document assets
export const useDocumentAssets = (): Asset[] => {
  return useAssetsByType('document')
}

/* -------------------------------------------------------------------------- */
/*                              BUCKET HOOKS                                  */
/* -------------------------------------------------------------------------- */

// Helper function to get bucket
const getBucketFromCache = (bucketIdOrName: string): Bucket | undefined => {
  if (!cachedBuckets.length) {
    console.warn('No buckets available. Make sure ThemeProvider is mounted.')
    return undefined
  }

  return cachedBuckets.find(b => 
    b.id === bucketIdOrName || 
    b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
    b.displayName?.toLowerCase() === bucketIdOrName.toLowerCase()
  )
}

// Hook to access all buckets
export const useBuckets = (): Bucket[] => {
  const { projectData } = useTheme()
  const [buckets, setBuckets] = useState<Bucket[]>([])

  useEffect(() => {
    if (projectData?.buckets) {
      const projectId = projectData.project_id || getGlobalProjectId() || ''
      const transformedBuckets = projectData.buckets.map(bucket => 
        transformProjectBucket(bucket, projectId)
      )
      setBuckets(transformedBuckets)
      cachedBuckets = transformedBuckets
    } else {
      setBuckets([])
    }
  }, [projectData])

  return buckets
}

// Hook to get a specific bucket
export const useBucket = (bucketIdOrName: string): Bucket | undefined => {
  const buckets = useBuckets()
  return buckets.find(b => 
    b.id === bucketIdOrName || 
    b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
    b.displayName?.toLowerCase() === bucketIdOrName.toLowerCase()
  )
}

// Hook to get buckets by category
export const useBucketsByCategory = (category: string): Bucket[] => {
  const buckets = useBuckets()
  
  if (category === 'all' || category === 'uncategorized') {
    return buckets.filter(b => !b.category || b.category === 'uncategorized')
  }
  
  return buckets.filter(b => b.category === category)
}

// Hook to get bucket JSON files
export const useBucketJsonFiles = (bucketIdOrName: string): {
  files: JsonFileInfo[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
} => {
  const [files, setFiles] = useState<JsonFileInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bucket = useBucket(bucketIdOrName)
  const { projectId } = useTheme()

  const loadFiles = useCallback(async () => {
    if (!bucket || !projectId) {
      setFiles([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
      const jsonFiles = await listBucketJsonFiles(bucketSanitizedName, projectId)
      setFiles(jsonFiles)
      
      // Update cache
      const cacheKey = `${bucket.id}_${projectId}`
      cachedJsonFiles[cacheKey] = jsonFiles
      
    } catch (err) {
      console.error('Error loading JSON files:', err)
      setError(err instanceof Error ? err.message : 'Failed to load JSON files')
    } finally {
      setLoading(false)
    }
  }, [bucket, projectId])

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  return {
    files,
    loading,
    error,
    refresh: loadFiles
  }
}

// Hook to get paginated records (YOU ONLY NEED TO PASS PAGE NUMBER!)
export const usePaginatedRecords = (
  bucketIdOrName: string, 
  page: number,
  pageSize?: number
): {
  records: BucketRecord[]
  metadata: JsonFileMetadata | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
} => {
  const [records, setRecords] = useState<BucketRecord[]>([])
  const [metadata, setMetadata] = useState<JsonFileMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bucket = useBucket(bucketIdOrName)
  const { projectId } = useTheme()


  const loadRecords = useCallback(async () => {
    if (!bucket || !projectId) {
      setRecords([])
      setMetadata(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
      const jsonData = await loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
 
      
      if (jsonData) {
        let recordsToSet = jsonData.records || []
        
        // If pageSize is specified, limit the records
        if (pageSize && recordsToSet.length > pageSize) {
          recordsToSet = recordsToSet.slice(0, pageSize)
        }
        
        setRecords(recordsToSet)
        setMetadata(jsonData.metadata)
        
        // Update cache
        const cacheKey = `${bucket.id}_${projectId}`
        if (!cachedJsonData[cacheKey]) {
          cachedJsonData[cacheKey] = {}
        }
        cachedJsonData[cacheKey][page] = jsonData
      } else {
        setRecords([])
        setMetadata(null)
      }
      
    } catch (err) {
      console.error(`Error loading records for page ${page}:`, err)
      setError(err instanceof Error ? err.message : 'Failed to load records')
    } finally {
      setLoading(false)
    }
  }, [bucket, projectId, page, pageSize])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  return {
    records,
    metadata,
    loading,
    error,
    refresh: loadRecords
  }
}

// Hook to get all records from JSON files
export const useAllJsonRecords = (
  bucketIdOrName: string
): {
  records: BucketRecord[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
} => {
  const [records, setRecords] = useState<BucketRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bucket = useBucket(bucketIdOrName)
  const { projectId } = useTheme()
  const { files, loading: filesLoading } = useBucketJsonFiles(bucketIdOrName)

  const loadAllRecords = useCallback(async () => {
    if (!bucket || !projectId || filesLoading) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Load pages in parallel for better performance
      const pageNumbers = files.map(file => file.page)
      const jsonDataArray = await loadMultipleJsonPages(
        sanitizeBucketName(bucket.displayName || bucket.name),
        projectId,
        pageNumbers
      )
      
      const allRecords: BucketRecord[] = []
      jsonDataArray.forEach(jsonData => {
        if (jsonData && jsonData.records) {
          allRecords.push(...jsonData.records)
        }
      })
      
      setRecords(allRecords)
      
    } catch (err) {
      console.error('Error loading all records:', err)
      setError(err instanceof Error ? err.message : 'Failed to load records')
    } finally {
      setLoading(false)
    }
  }, [bucket, projectId, files, filesLoading])

  useEffect(() => {
    if (!filesLoading) {
      loadAllRecords()
    }
  }, [loadAllRecords, filesLoading])

  return {
    records,
    loading: loading || filesLoading,
    error,
    refresh: loadAllRecords
  }
}

// Hook for cache management
export const useBucketCache = () => {
  const clearCache = useCallback((bucketIdOrName?: string) => {
    if (bucketIdOrName) {
      const bucket = getBucketFromCache(bucketIdOrName)
      if (bucket) {
        const { projectId } = useContext(ThemeContext)
        if (projectId) {
          const cacheKey = `${bucket.id}_${projectId}`
          delete cachedJsonFiles[cacheKey]
          delete cachedJsonData[cacheKey]
          
          // Also clear JSON file cache
          const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
          for (const key of Array.from(jsonFileCache.keys())) {
            if (key.startsWith(`${projectId}:${bucketSanitizedName}`)) {
              jsonFileCache.delete(key)
            }
          }
        }
      }
    } else {
      cachedJsonFiles = {}
      cachedJsonData = {}
      jsonFileCache.clear()
    }
  }, [])

  const refresh = useCallback(() => {
    // This will be handled by the ThemeProvider when project data changes
    console.log('Buckets will refresh when project data updates')
  }, [])

  return {
    clearCache,
    refresh
  }
}

// Helper function to get bucket records (for non-hook usage)
export const getPaginatedRecords = async (
  bucketIdOrName: string, 
  page: number,
  pageSize?: number
): Promise<{
  records: BucketRecord[]
  metadata: JsonFileMetadata | null
}> => {
  const bucket = getBucketFromCache(bucketIdOrName)
  if (!bucket) {
    throw new Error(`Bucket not found: ${bucketIdOrName}`)
  }

  const { projectId } = useContext(ThemeContext)
  if (!projectId) {
    throw new Error('Project ID not available')
  }

  const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
  const jsonData = await loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
  
  if (!jsonData) {
    return { records: [], metadata: null }
  }

  let records = jsonData.records || []
  if (pageSize && records.length > pageSize) {
    records = records.slice(0, pageSize)
  }

  return {
    records,
    metadata: jsonData.metadata
  }
}
// 'use client'
// import React, {
//   useEffect,
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useMemo,
//   useCallback,
// } from 'react'
// import { colorVarsToDarken, themes } from './themes'
// import { getDarkenAmount, darkenToRgba } from './darkenUtils'

// /* -------------------------------------------------------------------------- */
// /*                                 TYPES                                      */
// /* -------------------------------------------------------------------------- */
// export type ThemeVariant = 'standard' | 'minimal'

// export type ThemeName =
//   | 'light'
//   | 'dark'
//   | 'dark-blue'
//   | 'light-gray'
//   | 'pastel-green'
//   | 'warm-orange'
//   | 'frosted-glass'
//   | 'midnight-purple'
//   | 'cyber-metal'

// interface ThemeConfig {
//   [key: string]: any
// }

// interface Variable {
//   name: string
//   value: any
// }

// // Bucket Types
// export interface BucketField {
//   name: string
//   label: string
//   type: string
//   required?: boolean
//   options?: string[]
//   min?: number
//   max?: number
//   multiple?: boolean
// }

// export interface Bucket {
//   id: string
//   name: string
//   displayName: string
//   category?: string
//   fields: BucketField[]
//   createdBy: string
//   createdAt: number
//   updatedAt: number
//   updatedBy: string
//   recordCount: number
//   jsonFilesCount: number
//   totalRecordsInJson: number
//   lastJsonExport?: number
//   userId?: string
//   createdAtString?: string
//   updatedAtString?: string
// }

// export interface BucketRecord {
//   id: string
//   values: Record<string, any>
//   createdBy: string
//   createdAt: number
//   updatedAt: number
//   updatedBy: string
// }

// export interface JsonFileMetadata {
//   page: number
//   totalPages: number
//   recordsInPage: number
//   totalRecords: number
//   exportedAt: string
//   recordsPerFile: number
//   projectId: string
//   bucketId: string
//   bucketName: string
// }

// export interface JsonFileData {
//   metadata: JsonFileMetadata
//   records: BucketRecord[]
// }

// export interface JsonFileInfo {
//   name: string
//   fullPath: string
//   url: string
//   size: number
//   page: number
// }

// interface ProjectData {
//   theme_config?: {
//     colors?: Record<string, string>
//     typography?: Record<string, string>
//     [key: string]: any
//   }
//   components?: Record<string, any>
//   default_variation?: ThemeVariant
//   variables?: Variable[]
//   assets?: Asset[]
//   buckets?: any[]
//   name?: string
//   project_id?: string
//   version?: number
//   updated_at?: string
//   trustedDomains?: Array<{
//     domain: string
//     status: string
//     isDefault?: boolean
//   }>
// }

// interface ThemeProviderProps {
//   theme: ThemeName
//   projectId?: string
//   funcss?: string
//   minHeight?: string
//   children: ReactNode
//   project?: ProjectData | null // New prop: directly provide project data
// }

// /* -------------------------------------------------------------------------- */
// /*                              THEME CONTEXT                                 */
// /* -------------------------------------------------------------------------- */
// interface ThemeContextType {
//   variant: ThemeVariant
//   setVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>
//   themeConfig: ThemeConfig
//   projectData: ProjectData | null
//   isLoading: boolean
//   isInitialLoad: boolean
//   error: string | null
//   projectId?: string
// }

// const ThemeContext = createContext<ThemeContextType>({
//   variant: 'standard',
//   setVariant: () => {},
//   themeConfig: {},
//   projectData: null,
//   isLoading: true,
//   isInitialLoad: true,
//   error: null,
//   projectId: undefined,
// })

// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext)
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider')
//   }
//   return context
// }

// export const useVariant = () => {
//   const { variant, setVariant } = useTheme()
//   return { variant, setVariant }
// }

// /* -------------------------------------------------------------------------- */
// /*                          ORIGIN VALIDATION                                 */
// /* -------------------------------------------------------------------------- */

// const getCurrentOrigin = (): string => {
//   if (typeof window === 'undefined') return ''
  
//   // For local development, return localhost
//   if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     return 'localhost'
//   }
  
//   // For production, return the domain without protocol and www
//   let domain = window.location.hostname
//   domain = domain.replace(/^www\./, '')
//   return domain
// }

// const validateOriginAccess = async (projectId: string): Promise<boolean> => {
//   if (!projectId) {
//     console.error('❌ No project ID provided for origin validation')
//     return false
//   }

//   const currentOrigin = getCurrentOrigin()
//   console.log(`🔍 Validating origin access for: ${currentOrigin}`)

//   try {
//     // Load project data from CDN to check trusted domains
//     const projectData = await loadThemeFromCDN(projectId)
    
//     if (!projectData) {
//       console.error('❌ Project not found or inaccessible')
//       return false
//     }

//     const trustedDomains = projectData.trustedDomains || []
    
//     // Check if current origin is in trusted domains
//     const hasAccess = trustedDomains.some(domain => {
//       const trustedDomain = domain.domain.toLowerCase()
//       const currentDomain = currentOrigin.toLowerCase()
      
//       // Exact match or subdomain match
//       return currentDomain === trustedDomain || 
//              currentDomain.endsWith('.' + trustedDomain) ||
//              (trustedDomain === 'localhost' && currentOrigin === 'localhost')
//     })

//     if (!hasAccess) {
//       console.error(`❌ Access denied: Origin "${currentOrigin}" is not in trusted domains`)
//       console.log('📋 Trusted domains:', trustedDomains.map(d => d.domain))
//       return false
//     }

//     return true

//   } catch (error) {
//     console.error('❌ Error during origin validation:', error)
//     return false
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                          LOCAL FILE MANAGEMENT                             */
// /* -------------------------------------------------------------------------- */

// const loadLocalTheme = async (): Promise<ProjectData | null> => {
//   try {
//     const response = await fetch('/funui.json', {
//       cache: 'no-cache',
//     })
    
//     if (response.ok) {
//       const data = await response.json()
//       return data
//     }
//   } catch (error) {
//     console.log('ℹ️ No local theme file found')
//   }
//   return null
// }

// /* -------------------------------------------------------------------------- */
// /*                          CDN THEME LOADER                                  */
// /* -------------------------------------------------------------------------- */

// const loadThemeFromCDN = async (projectId: string): Promise<ProjectData | null> => {
//   if (!projectId) {
//     console.error('❌ No project ID provided for CDN loading')
//     return null
//   }

//   // Try Firebase Storage public URL
//   try {
//     const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/themes%2F${projectId}.json?alt=media`
    
//     const response = await fetch(publicUrl, {
//       cache: 'no-cache',
//     })
    
//     if (response.ok) {
//       const data = await response.json()
//       return data
//     } else {
//       console.error('❌ Firebase Storage fetch failed:', response.status, response.statusText)
//     }
//   } catch (error) {
//     console.error('❌ Error loading from Firebase Storage:', error)
//   }

//   return null
// }

// /* -------------------------------------------------------------------------- */
// /*                          BUCKET JSON LOADER                                */
// /* -------------------------------------------------------------------------- */

// // Cache for JSON responses
// const jsonFileCache = new Map<string, { data: JsonFileData; timestamp: number }>()
// const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// // Helper function to get cache key
// const getCacheKey = (bucketSanitizedName: string, projectId: string, page: number): string => {
//   return `${projectId}:${bucketSanitizedName}:${page}`
// }

// // Helper function to clean expired cache entries
// const cleanExpiredCache = () => {
//   const now = Date.now()
//   for (const key of Array.from(jsonFileCache.keys())) {
//     const entry = jsonFileCache.get(key) 
//     if (entry && now - entry.timestamp > CACHE_DURATION) {
//       jsonFileCache.delete(key)
//     }
//   }
//   }

// // Load JSON file with caching and performance optimizations
// const loadBucketJsonFromCDN = async (
//   bucketSanitizedName: string, 
//   projectId: string, 
//   page: number
// ): Promise<JsonFileData | null> => {
//   if (!bucketSanitizedName || !projectId) {
//     console.error('❌ Missing parameters for JSON loading')
//     return null
//   }

//   // Clean expired cache entries periodically
//   if (jsonFileCache.size > 100) { // Only clean when cache gets large
//     cleanExpiredCache()
//   }

//   // Check cache first
//   const cacheKey = getCacheKey(bucketSanitizedName, projectId, page)
//   const cached = jsonFileCache.get(cacheKey)
  
//   if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
//     console.log(`📦 Returning cached data for page ${page}`)
//     return cached.data
//   }

//   try {
//     // Construct the URL for JSON files
//     const pageNumber = page.toString()
//     const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2F${pageNumber}.json?alt=media`

//     // Use AbortController for request timeout
//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

//     const response = await fetch(publicUrl, {
//       cache: 'no-cache',
//       signal: controller.signal
//     })
    
//     clearTimeout(timeoutId)
    
//     if (response.ok) {
//       const data = await response.json()
      
//       // Cache the response
//       jsonFileCache.set(cacheKey, {
//         data,
//         timestamp: Date.now()
//       })
      
//       return data
//     } else {
//       // File might not exist (e.g., page out of range)
//       return null
//     }
//   } catch (error) {
//     if (error instanceof DOMException && error.name === 'AbortError') {
//       console.error(`⏰ Timeout loading JSON file for page ${page}`)
//     } else {
//       console.error(`❌ Error loading JSON file for page ${page}:`, error)
//     }
//     return null
//   }
// }

// // Parallel loading for multiple pages
// const loadMultipleJsonPages = async (
//   bucketSanitizedName: string, 
//   projectId: string, 
//   pages: number[]
// ): Promise<(JsonFileData | null)[]> => {
//   try {
//     const promises = pages.map(page => 
//       loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
//     )
    
//     const results = await Promise.all(promises)
//     return results.filter(Boolean) as JsonFileData[]
//   } catch (error) {
//     console.error('❌ Error loading multiple JSON pages:', error)
//     return []
//   }
// }

// const listBucketJsonFiles = async (
//   bucketSanitizedName: string, 
//   projectId: string
// ): Promise<JsonFileInfo[]> => {
//   if (!bucketSanitizedName || !projectId) {
//     console.error('❌ Missing parameters for listing JSON files')
//     return []
//   }

//   try {
//     const files: JsonFileInfo[] = []
//     let page = 1
//     let hasMoreFiles = true
    
//     // Check multiple pages in parallel for faster discovery
//     const batchSize = 5
//     const pageChecks = []
    
//     while (hasMoreFiles && page <= 100) {
//       const batchPromises = []
      
//       for (let i = 0; i < batchSize && page <= 100; i++) {
//         const paddedPage = page.toString().padStart(3, '0')
//         const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2Fpage_${paddedPage}.json?alt=media`
        
//         batchPromises.push(
//           fetch(publicUrl, {
//             method: 'HEAD',
//             cache: 'no-cache',
//           })
//         )
//         page++
//       }
      
//       const responses = await Promise.all(batchPromises)
      
//       for (let i = 0; i < responses.length; i++) {
//         if (responses[i].ok) {
//           const currentPage = page - batchSize + i
//           const paddedPage = currentPage.toString().padStart(3, '0')
//           const publicUrl = `https://firebasestorage.googleapis.com/v0/b/funui-4bcd1.firebasestorage.app/o/projects%2F${projectId}%2Fbuckets%2F${bucketSanitizedName}%2Fpage_${paddedPage}.json?alt=media`
          
//           files.push({
//             name: `page_${paddedPage}.json`,
//             fullPath: `projects/${projectId}/buckets/${bucketSanitizedName}/page_${paddedPage}.json`,
//             url: publicUrl,
//             size: parseInt(responses[i].headers.get('content-length') || '0', 10),
//             page: currentPage
//           })
//         } else {
//           hasMoreFiles = false
//           break
//         }
//       }
//     }
    
//     return files
//   } catch (error) {
//     console.error('❌ Error listing JSON files:', error)
//     return []
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                          CSS VARIABLE APPLIER                              */
// /* -------------------------------------------------------------------------- */

// const applyTypographyVariables = (typography: Record<string, string>, root: HTMLElement) => {
//   if (!typography) return

//   Object.entries(typography).forEach(([key, value]) => {
//     const cssVarName = `--${key.replace(/_/g, '-')}`
//     root.style.setProperty(cssVarName, value)
//   })
// }

// const applyColorVariables = (colors: Record<string, string>, root: HTMLElement) => {
//   if (!colors) return

//   Object.entries(colors).forEach(([key, value]) => {
//     const cssVarName = `--${key.replace(/_/g, '-')}`
//     root.style.setProperty(cssVarName, value)
//   })
// }

// const applyThemeConfig = (themeConfig: Record<string, any>, root: HTMLElement) => {
//   if (!themeConfig) return

//   if (themeConfig.colors) {
//     applyColorVariables(themeConfig.colors, root)
//   }

//   if (themeConfig.typography) {
//     applyTypographyVariables(themeConfig.typography, root)
//   }

//   Object.entries(themeConfig).forEach(([key, value]) => {
//     if (key !== 'colors' && key !== 'typography' && typeof value === 'string') {
//       const cssVarName = `--${key.replace(/_/g, '-')}`
//       root.style.setProperty(cssVarName, value)
//     }
//   })
// }

// /* -------------------------------------------------------------------------- */
// /*                          VARIABLES HELPER                                  */
// /* -------------------------------------------------------------------------- */

// let cachedProjectData: ProjectData | null = null

// export const getVariable = (name: string): { name: string; value: any } | undefined => {
//   if (!cachedProjectData?.variables) {
//     console.warn('No variables available. Make sure ThemeProvider is mounted.')
//     return undefined
//   }

//   const variable = cachedProjectData.variables.find(v => v.name === name)
//   return variable
// }

// export const getAllVariables = (): Variable[] => {
//   return cachedProjectData?.variables || []
// }

// /* -------------------------------------------------------------------------- */
// /*                          BUCKET UTILITIES                                  */
// /* -------------------------------------------------------------------------- */

// // Cache for buckets and JSON files
// let cachedBuckets: Bucket[] = []
// let cachedJsonFiles: Record<string, JsonFileInfo[]> = {}
// let cachedJsonData: Record<string, Record<number, JsonFileData>> = {}

// const sanitizeBucketName = (name: string): string => {
//   return name
//     .trim()
//     .replace(/\s+/g, '_')
//     .replace(/[^a-zA-Z0-9_-]/g, '')
//     .toLowerCase()
// }

// const transformProjectBucket = (bucket: any, projectId: string): Bucket => {
//   return {
//     id: bucket.id || bucket._id || '',
//     name: bucket.name || '',
//     displayName: bucket.displayName || bucket.name || '',
//     category: bucket.category || 'uncategorized',
//     fields: Array.isArray(bucket.fields) ? bucket.fields : [],
//     createdBy: bucket.createdBy || bucket.userId || '',
//     createdAt: typeof bucket.createdAt === 'number' ? bucket.createdAt : Date.now(),
//     updatedAt: typeof bucket.updatedAt === 'number' ? bucket.updatedAt : Date.now(),
//     updatedBy: bucket.updatedBy || bucket.createdBy || '',
//     recordCount: bucket.recordCount || 0,
//     jsonFilesCount: bucket.jsonFilesCount || 0,
//     totalRecordsInJson: bucket.totalRecordsInJson || 0,
//     lastJsonExport: bucket.lastJsonExport,
//     userId: bucket.userId,
//     createdAtString: bucket.createdAt,
//     updatedAtString: bucket.updatedAt
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                                COMPONENT                                   */
// /* -------------------------------------------------------------------------- */
// const ThemeProvider: React.FC<ThemeProviderProps> = ({
//   theme,
//   children,
//   funcss = '',
//   minHeight = '100vh',
//   projectId,
//   project: providedProject, // New prop
// }) => {
//   const [variant, setVariant] = useState<ThemeVariant>('standard')
//   const [themeConfig, setThemeConfig] = useState<ThemeConfig>({})
//   const [projectData, setProjectData] = useState<ProjectData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isInitialLoad, setIsInitialLoad] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [currentVersion, setCurrentVersion] = useState<number | null>(null)

//   /* -------------------------- Apply base theme --------------------------- */
//   useEffect(() => {
//     const root = document.documentElement
//     const selectedTheme = themes[theme] || themes.light

//     Object.entries(selectedTheme).forEach(([key, value]) => {
//       root.style.setProperty(key, value)
//     })

//     if (
//       ['dark', 'dark-blue', 'midnight-purple', 'cyber-metal'].includes(theme)
//     ) {
//       colorVarsToDarken.forEach((varName) => {
//         const original = getComputedStyle(root)
//           .getPropertyValue(varName)
//           .trim()
//         if (original) {
//           const darkAmount = getDarkenAmount(varName)
//           const rgba = darkenToRgba(original, darkAmount, 0.9)
//           root.style.setProperty(varName, rgba)
//         }
//       })
//     }
//   }, [theme])

//   /* ---------------------- Theme Loading Logic ----------------------- */
//   useEffect(() => {
//     if (typeof window === 'undefined') {
//       setIsLoading(false)
//       setIsInitialLoad(false)
//       return
//     }

//     const root = document.documentElement
//     let pollTimer: NodeJS.Timeout

//     const loadTheme = async () => {
//       try {
//         let finalTheme: ProjectData | null = null
//         let finalVersion: number | null = null

//         // If project data is provided directly, use it and skip all loading
//         if (providedProject) {
//           console.log('✅ Using provided project data directly')
//           finalTheme = providedProject
//           finalVersion = providedProject.version || 0
          
//           // Apply theme immediately
//           applyThemeData(finalTheme, root)
//           setCurrentVersion(finalVersion)
//           setError(null)
//           setIsLoading(false)
//           setIsInitialLoad(false)
//           return // Skip all other loading logic
//         }

//         // Otherwise, follow the normal loading flow
//         // First, try to load local theme
//         const localTheme = await loadLocalTheme()
//         const localVersion = localTheme?.version || 0

//         if (projectId) {
//           // Validate origin access for CDN
//           const hasAccess = await validateOriginAccess(projectId)
          
//           if (hasAccess) {
//             // Try to load from CDN
//             const cdnTheme = await loadThemeFromCDN(projectId)
//             const cdnVersion = cdnTheme?.version || 0

//             if (cdnTheme) {
//               // CDN theme available - use it
//               finalTheme = cdnTheme
//               finalVersion = cdnVersion
              
//               if (cdnVersion !== localVersion) {
//                 console.log(`🔄 Version mismatch: Local(${localVersion}) vs CDN(${cdnVersion})`)
//                 console.log('ℹ️ Using CDN version. Please update your local funui.json file manually.')
//               }

//             } else if (localTheme) {
//               // CDN not available but we have local theme
//               console.log('⚠️ CDN unavailable, using local theme')
//               finalTheme = localTheme
//               finalVersion = localVersion
//             } else {
//               // No theme available anywhere
//               console.warn('⚠️ No theme found (CDN unavailable and no local theme)')
//               setError('Theme not found')
//             }
//           } else {
//             // Origin validation failed
//             if (localTheme) {
//               console.log('⚠️ Origin validation failed, using local theme')
//               finalTheme = localTheme
//               finalVersion = localVersion
//             } else {
//               console.error('❌ Origin validation failed and no local theme available')
//               setError('Access denied and no local theme available')
//             }
//           }
//         } else {
//           // No project ID provided - only use local theme
//           console.log('ℹ️ No project ID provided, using local theme only')
//           if (localTheme) {
//             finalTheme = localTheme
//             finalVersion = localVersion
//             console.log('✅ Theme loaded from local file')
//           } else {
//             console.log('ℹ️ No local theme file found - using base theme only')
//             // No error here - it's valid to use only base theme
//           }
//         }

//         // Apply the theme if we have one
//         if (finalTheme && (!currentVersion || finalVersion !== currentVersion)) {
//           applyThemeData(finalTheme, root)
//           setCurrentVersion(finalVersion)
//           setError(null)
//         } else if (finalTheme) {
//           console.log('✓ Theme up to date')
//         }

//       } catch (err) {
//         console.error('❌ Error loading theme:', err)
//         setError('Failed to load theme')
//       } finally {
//         setIsLoading(false)
//         setIsInitialLoad(false)
//       }
//     }

//     // Only load theme if no project is provided
//     if (!providedProject) {
//       // Initial load
//       loadTheme()

//       // Only poll for updates if we have a project ID
//       if (projectId) {
//         pollTimer = setInterval(() => {
//           loadTheme()
//         }, 5 * 60 * 1000)
//       }

//       return () => {
//         if (pollTimer) {
//           clearInterval(pollTimer)
//         }
//       }
//     } else {
//       // If project is provided, skip loading and set state directly
//       console.log('✅ Using provided project data, skipping theme loading')
//       applyThemeData(providedProject, document.documentElement)
//       setCurrentVersion(providedProject.version || 0)
//       setIsLoading(false)
//       setIsInitialLoad(false)
//     }
//   }, [projectId, currentVersion, theme, providedProject]) // Added providedProject to dependencies

//   const applyThemeData = (data: ProjectData, root: HTMLElement) => {
//     const themeConfig = data.theme_config ?? {}
//     const newVariant = data.default_variation || 'standard'

//     setVariant(newVariant)
//     setThemeConfig(themeConfig)
//     setProjectData(data)
    
//     // Cache for variable access
//     cachedProjectData = data
    
//     // Cache for asset access
//     cachedAssets = data.assets || []
    
//     // Cache for bucket access
//     const projectBuckets = data.buckets || []
//     cachedBuckets = projectBuckets.map(bucket => 
//       transformProjectBucket(bucket, data.project_id || '')
//     )

//     // Apply all theme config to CSS variables
//     applyThemeConfig(themeConfig, root)
//   }

//   const contextValue = useMemo(
//     () => ({
//       variant,
//       setVariant,
//       themeConfig,
//       projectData,
//       isLoading,
//       isInitialLoad,
//       error,
//       projectId, // Include projectId in context
//     }),
//     [variant, themeConfig, projectData, isLoading, isInitialLoad, error, projectId]
//   )

//   return (
//     <ThemeContext.Provider value={contextValue}>
//       <div
//         className={`theme-${theme} ${funcss}`}
//         style={{
//           backgroundColor: 'var(--page-bg)',
//           color: 'var(--text-color)',
//           minHeight: minHeight,
//           transition: isInitialLoad ? 'none' : 'background-color 0.3s ease, color 0.3s ease',
//         }}
//       >
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   )
// }

// export default ThemeProvider

// /* -------------------------------------------------------------------------- */
// /*                              HELPER HOOKS                                  */
// /* -------------------------------------------------------------------------- */

// export const useThemeValue = (key: string): string | undefined => {
//   const { themeConfig } = useTheme()
//   return themeConfig[key]
// }

// export const useComponentConfig = (componentName: string): any => {
//   const { projectData } = useTheme()
//   return projectData?.components?.[componentName] || {}
// }

// export const useColors = (): Record<string, string> => {
//   const { projectData } = useTheme()
//   return projectData?.theme_config?.colors || {}
// }

// export const useTypography = (): Record<string, string> => {
//   const { projectData } = useTheme()
//   return projectData?.theme_config?.typography || {}
// }

// export const useThemeConfig = (): Record<string, any> => {
//   const { projectData } = useTheme()
//   return projectData?.theme_config || {}
// }

// export const useProjectData = (): ProjectData | null => {
//   const { projectData } = useTheme()
//   return projectData
// }

// export const useColor = (colorName: string): string | undefined => {
//   const colors = useColors()
//   return colors[colorName]
// }

// export const useTypographyValue = (property: string): string | undefined => {
//   const typography = useTypography()
//   return typography[property]
// }

// export const useComponentVariant = (componentName: string, variantName: string = 'default'): any => {
//   const componentConfig = useComponentConfig(componentName)
//   return componentConfig[variantName] || {}
// }

// // Hook to access variables
// export const useVariables = (): Variable[] => {
//   const { projectData } = useTheme()
//   return projectData?.variables || []
// }

// // Hook to get a specific variable
// export const useVariable = (name: string): any => {
//   const variables = useVariables()
//   const variable = variables.find(v => v.name === name)
//   return variable?.value
// }

// /* -------------------------------------------------------------------------- */
// /*                              ASSETS HELPER                                 */
// /* -------------------------------------------------------------------------- */

// interface Asset {
//   name: string
//   url: string
//   file_type: string
// }

// let cachedAssets: Asset[] = []

// export const getAsset = (name: string): Asset | undefined => {
//   if (!cachedAssets.length) {
//     console.warn('No assets available. Make sure ThemeProvider is mounted.')
//     return undefined
//   }

//   const asset = cachedAssets.find(a => a.name === name)
//   return asset
// }

// export const getAllAssets = (): Asset[] => {
//   return cachedAssets
// }

// export const getAssetValue = (name: string): string | undefined => {
//   const asset = getAsset(name)
//   return asset?.url
// }

// export const getAssetType = (name: string): string | undefined => {
//   const asset = getAsset(name)
//   return asset?.file_type
// }

// export const getAssetInfo = (name: string): { value: string; type: string; name: string } | undefined => {
//   const asset = getAsset(name)
//   if (!asset) return undefined
  
//   return {
//     value: asset.url,
//     type: asset.file_type,
//     name: asset.name
//   }
// }

// // Hook to access all assets
// export const useAssets = (): Asset[] => {
//   const { projectData } = useTheme()
//   return projectData?.assets || []
// }

// // Hook to get a specific asset
// export const useAsset = (name: string): Asset | undefined => {
//   const assets = useAssets()
//   const asset = assets.find(a => a.name === name)
//   return asset
// }

// // Hook to get asset URL (most common use case)
// export const useAssetValue = (name: string): string | undefined => {
//   const asset = useAsset(name)
//   return asset?.url
// }

// // Hook to get asset type
// export const useAssetType = (name: string): string | undefined => {
//   const asset = useAsset(name)
//   return asset?.file_type
// }

// // Hook to get complete asset info
// export const useAssetInfo = (name: string): { value: string; type: string; name: string } | undefined => {
//   const asset = useAsset(name)
//   if (!asset) return undefined
  
//   return {
//     value: asset.url,
//     type: asset.file_type,
//     name: asset.name
//   }
// }

// // Hook to filter assets by type
// export const useAssetsByType = (type: string): Asset[] => {
//   const assets = useAssets()
//   return assets.filter(asset => asset.file_type === type)
// }

// // Hook to get image assets
// export const useImageAssets = (): Asset[] => {
//   return useAssetsByType('image')
// }

// // Hook to get video assets
// export const useVideoAssets = (): Asset[] => {
//   return useAssetsByType('video')
// }

// // Hook to get audio assets
// export const useAudioAssets = (): Asset[] => {
//   return useAssetsByType('audio')
// }

// // Hook to get document assets
// export const useDocumentAssets = (): Asset[] => {
//   return useAssetsByType('document')
// }

// /* -------------------------------------------------------------------------- */
// /*                              BUCKET HOOKS                                  */
// /* -------------------------------------------------------------------------- */

// // Helper function to get bucket
// const getBucketFromCache = (bucketIdOrName: string): Bucket | undefined => {
//   if (!cachedBuckets.length) {
//     console.warn('No buckets available. Make sure ThemeProvider is mounted.')
//     return undefined
//   }

//   return cachedBuckets.find(b => 
//     b.id === bucketIdOrName || 
//     b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
//     b.displayName?.toLowerCase() === bucketIdOrName.toLowerCase()
//   )
// }

// // Hook to access all buckets
// export const useBuckets = (): Bucket[] => {
//   const { projectData } = useTheme()
//   const [buckets, setBuckets] = useState<Bucket[]>([])

//   useEffect(() => {
//     if (projectData?.buckets) {
//       const transformedBuckets = projectData.buckets.map(bucket => 
//         transformProjectBucket(bucket, projectData.project_id || '')
//       )
//       setBuckets(transformedBuckets)
//       cachedBuckets = transformedBuckets
//     } else {
//       setBuckets([])
//     }
//   }, [projectData])

//   return buckets
// }

// // Hook to get a specific bucket
// export const useBucket = (bucketIdOrName: string): Bucket | undefined => {
//   const buckets = useBuckets()
//   return buckets.find(b => 
//     b.id === bucketIdOrName || 
//     b.name.toLowerCase() === bucketIdOrName.toLowerCase() ||
//     b.displayName?.toLowerCase() === bucketIdOrName.toLowerCase()
//   )
// }

// // Hook to get buckets by category
// export const useBucketsByCategory = (category: string): Bucket[] => {
//   const buckets = useBuckets()
  
//   if (category === 'all' || category === 'uncategorized') {
//     return buckets.filter(b => !b.category || b.category === 'uncategorized')
//   }
  
//   return buckets.filter(b => b.category === category)
// }

// // Hook to get bucket JSON files
// export const useBucketJsonFiles = (bucketIdOrName: string): {
//   files: JsonFileInfo[]
//   loading: boolean
//   error: string | null
//   refresh: () => Promise<void>
// } => {
//   const [files, setFiles] = useState<JsonFileInfo[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const bucket = useBucket(bucketIdOrName)
//   const { projectId } = useTheme()

//   const loadFiles = useCallback(async () => {
//     if (!bucket || !projectId) {
//       setFiles([])
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)
      
//       const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
//       const jsonFiles = await listBucketJsonFiles(bucketSanitizedName, projectId)
//       setFiles(jsonFiles)
      
//       // Update cache
//       const cacheKey = `${bucket.id}_${projectId}`
//       cachedJsonFiles[cacheKey] = jsonFiles
      
//     } catch (err) {
//       console.error('Error loading JSON files:', err)
//       setError(err instanceof Error ? err.message : 'Failed to load JSON files')
//     } finally {
//       setLoading(false)
//     }
//   }, [bucket, projectId])

//   useEffect(() => {
//     loadFiles()
//   }, [loadFiles])

//   return {
//     files,
//     loading,
//     error,
//     refresh: loadFiles
//   }
// }

// // Hook to get paginated records (YOU ONLY NEED TO PASS PAGE NUMBER!)
// export const usePaginatedRecords = (
//   bucketIdOrName: string, 
//   page: number,
//   pageSize?: number
// ): {
//   records: BucketRecord[]
//   metadata: JsonFileMetadata | null
//   loading: boolean
//   error: string | null
//   refresh: () => Promise<void>
// } => {
//   const [records, setRecords] = useState<BucketRecord[]>([])
//   const [metadata, setMetadata] = useState<JsonFileMetadata | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const bucket = useBucket(bucketIdOrName)
//   const { projectId } = useTheme()


//   const loadRecords = useCallback(async () => {
//     if (!bucket || !projectId) {
//       setRecords([])
//       setMetadata(null)
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)
      
//       const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
//       const jsonData = await loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
 
      
//       if (jsonData) {
//         let recordsToSet = jsonData.records || []
        
//         // If pageSize is specified, limit the records
//         if (pageSize && recordsToSet.length > pageSize) {
//           recordsToSet = recordsToSet.slice(0, pageSize)
//         }
        
//         setRecords(recordsToSet)
//         setMetadata(jsonData.metadata)
        
//         // Update cache
//         const cacheKey = `${bucket.id}_${projectId}`
//         if (!cachedJsonData[cacheKey]) {
//           cachedJsonData[cacheKey] = {}
//         }
//         cachedJsonData[cacheKey][page] = jsonData
//       } else {
//         setRecords([])
//         setMetadata(null)
//       }
      
//     } catch (err) {
//       console.error(`Error loading records for page ${page}:`, err)
//       setError(err instanceof Error ? err.message : 'Failed to load records')
//     } finally {
//       setLoading(false)
//     }
//   }, [bucket, projectId, page, pageSize])

//   useEffect(() => {
//     loadRecords()
//   }, [loadRecords])

//   return {
//     records,
//     metadata,
//     loading,
//     error,
//     refresh: loadRecords
//   }
// }

// // Hook to get all records from JSON files
// export const useAllJsonRecords = (
//   bucketIdOrName: string
// ): {
//   records: BucketRecord[]
//   loading: boolean
//   error: string | null
//   refresh: () => Promise<void>
// } => {
//   const [records, setRecords] = useState<BucketRecord[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const bucket = useBucket(bucketIdOrName)
//   const { projectId } = useTheme()
//   const { files, loading: filesLoading } = useBucketJsonFiles(bucketIdOrName)

//   const loadAllRecords = useCallback(async () => {
//     if (!bucket || !projectId || filesLoading) {
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)
      
//       // Load pages in parallel for better performance
//       const pageNumbers = files.map(file => file.page)
//       const jsonDataArray = await loadMultipleJsonPages(
//         sanitizeBucketName(bucket.displayName || bucket.name),
//         projectId,
//         pageNumbers
//       )
      
//       const allRecords: BucketRecord[] = []
//       jsonDataArray.forEach(jsonData => {
//         if (jsonData && jsonData.records) {
//           allRecords.push(...jsonData.records)
//         }
//       })
      
//       setRecords(allRecords)
      
//     } catch (err) {
//       console.error('Error loading all records:', err)
//       setError(err instanceof Error ? err.message : 'Failed to load records')
//     } finally {
//       setLoading(false)
//     }
//   }, [bucket, projectId, files, filesLoading])

//   useEffect(() => {
//     if (!filesLoading) {
//       loadAllRecords()
//     }
//   }, [loadAllRecords, filesLoading])

//   return {
//     records,
//     loading: loading || filesLoading,
//     error,
//     refresh: loadAllRecords
//   }
// }

// // Hook for cache management
// export const useBucketCache = () => {
//   const clearCache = useCallback((bucketIdOrName?: string) => {
//     if (bucketIdOrName) {
//       const bucket = getBucketFromCache(bucketIdOrName)
//       if (bucket) {
//         const { projectId } = useContext(ThemeContext)
//         if (projectId) {
//           const cacheKey = `${bucket.id}_${projectId}`
//           delete cachedJsonFiles[cacheKey]
//           delete cachedJsonData[cacheKey]
          
//           // Also clear JSON file cache
//           const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
//           for (const key of Array.from(jsonFileCache.keys())) {
//             if (key.startsWith(`${projectId}:${bucketSanitizedName}`)) {
//               jsonFileCache.delete(key)
//             }
//           }
//         }
//       }
//     } else {
//       cachedJsonFiles = {}
//       cachedJsonData = {}
//       jsonFileCache.clear()
//     }
//   }, [])

//   const refresh = useCallback(() => {
//     // This will be handled by the ThemeProvider when project data changes
//     console.log('Buckets will refresh when project data updates')
//   }, [])

//   return {
//     clearCache,
//     refresh
//   }
// }

// // Helper function to get bucket records (for non-hook usage)
// export const getPaginatedRecords = async (
//   bucketIdOrName: string, 
//   page: number,
//   pageSize?: number
// ): Promise<{
//   records: BucketRecord[]
//   metadata: JsonFileMetadata | null
// }> => {
//   const bucket = getBucketFromCache(bucketIdOrName)
//   if (!bucket) {
//     throw new Error(`Bucket not found: ${bucketIdOrName}`)
//   }

//   const { projectId } = useContext(ThemeContext)
//   if (!projectId) {
//     throw new Error('Project ID not available')
//   }

//   const bucketSanitizedName = sanitizeBucketName(bucket.displayName || bucket.name)
//   const jsonData = await loadBucketJsonFromCDN(bucketSanitizedName, projectId, page)
  
//   if (!jsonData) {
//     return { records: [], metadata: null }
//   }

//   let records = jsonData.records || []
//   if (pageSize && records.length > pageSize) {
//     records = records.slice(0, pageSize)
//   }

//   return {
//     records,
//     metadata: jsonData.metadata
//   }
// }
