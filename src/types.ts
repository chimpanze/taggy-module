// Export module options interface
export interface ModuleOptions {
  /**
   * Base URL for the Taggy API
   * @default 'https://api.taggy.com/api/v1'
   */
  baseUrl: string

  /**
   * API key for the Taggy API (optional)
   */
  apiKey?: string

  /**
   * Enable debug mode (optional)
   * @default false
   */
  debug?: boolean

  /**
   * Authentication configuration (optional)
   * Allows customizing how authentication is handled
   */
  auth?: {
    /**
     * Function to get the authentication token
     * @returns Promise that resolves to the token string
     */
    getToken?: () => Promise<string>
  }
}

// Re-export runtime types
export * from './runtime/types'
