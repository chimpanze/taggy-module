import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { TaggyClient } from '@chimpanze/taggy-sdk'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Default getToken implementation
  const defaultGetToken = async () => {
    return Promise.resolve(localStorage.getItem('hanko_token') || '')
  }

  // Create Taggy client instance
  const taggyClient = new TaggyClient({
    baseUrl: config.public.taggy.baseUrl,
    auth: {
      // Use user-provided getToken function if available, otherwise fallback to default
      getToken: config.public.taggy.auth?.getToken || defaultGetToken,
    },
  })

  // Make client available in Nuxt app using provide/inject pattern
  // This is the recommended way to share instances in Nuxt
  nuxtApp.provide('taggy', taggyClient)
})
