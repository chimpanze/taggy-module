import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl: string
  apiKey?: string
  debug?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'taggy',
    configKey: 'taggy',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: 'https://api.taggy.com/api/v1',
    debug: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add runtime directory for composables
    addImportsDir(resolver.resolve('./runtime/composables'))

    // Add plugin
    addPlugin(resolver.resolve('./runtime/plugins/taggy'))

    // Add runtime config
    nuxt.options.runtimeConfig.public.taggy = defu(
      nuxt.options.runtimeConfig.public.taggy,
      {
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        debug: options.debug,
        auth: options.auth,
      },
    )
  },
})
