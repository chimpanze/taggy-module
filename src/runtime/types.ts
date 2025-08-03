import type { TaggyClient } from '@chimpanze/taggy-sdk'

// Extend the Nuxt app with Taggy types
declare module '#app' {
  interface NuxtApp {
    $taggy: TaggyClient
  }
}

// Extend the runtime config with Taggy options
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    taggy: {
      baseUrl: string
      apiKey?: string
      debug?: boolean
      auth?: {
        getToken?: () => Promise<string>
      }
    }
  }
}

// Extend the Vue app with Taggy types
declare module 'vue' {
  interface ComponentCustomProperties {
    $taggy: TaggyClient
  }
}
