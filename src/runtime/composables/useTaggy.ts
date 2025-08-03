import type { TaggyClient } from '@chimpanze/taggy-sdk'
import { useState, useNuxtApp } from '#app'

export function useTaggy() {
  // Get the Taggy client instance from the plugin using provide/inject pattern
  const { $taggy } = useNuxtApp()
  const taggyClient = $taggy as TaggyClient

  // Authentication state
  const isAuthenticated = useState<boolean>('taggy:authenticated', () => false)
  const user = useState<Record<string, unknown> | null>('taggy:user', () => null)

  // Provide access to all Taggy services
  const auth = taggyClient.auth
  const content = taggyClient.content
  const tags = taggyClient.tags
  const archive = taggyClient.archive
  const collections = taggyClient.collections
  const files = taggyClient.files
  const likes = taggyClient.likes
  const media = taggyClient.media
  const search = taggyClient.search
  const sharing = taggyClient.sharing
  const extension = taggyClient.extension
  const ai = taggyClient.ai
  const comments = taggyClient.comments
  const system = taggyClient.system

  // Helper functions for common operations
  // Get current user
  const getCurrentUser = async () => {
    try {
      const response = await auth.getCurrentUser()
      isAuthenticated.value = true
      user.value = response
      return response
    }
    catch (error) {
      isAuthenticated.value = false
      user.value = null
      throw error
    }
  }

  return {
    // Client instance
    client: taggyClient,

    // Authentication state
    isAuthenticated,
    user,

    // Services
    auth,
    content,
    tags,
    archive,
    collections,
    files,
    likes,
    media,
    search,
    sharing,
    extension,
    ai,
    comments,
    system,

    // Helper functions
    getCurrentUser,
  }
}
