// Export module options interface
export interface ModuleOptions {
  /**
   * Base URL for the Taggy API
   * @default 'https://api.taggy.com/api/v1'
   */
  baseUrl: string

  /**
   * Enable debug mode (optional)
   * @default false
   */
  debug?: boolean
}

// Re-export runtime types
export * from './runtime/types'
