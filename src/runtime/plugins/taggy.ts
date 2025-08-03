import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { TaggyClient } from '@chimpanze/taggy-sdk'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Create Taggy client instance
  const taggyClient = new TaggyClient(config.public.taggy)

  // Make client available in Nuxt app using provide/inject pattern
  // This is the recommended way to share instances in Nuxt
  nuxtApp.provide('taggy', taggyClient)
})
