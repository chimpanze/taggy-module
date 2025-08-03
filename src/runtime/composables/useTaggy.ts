import type { TaggyClient } from '@chimpanze/taggy-sdk'
import { useNuxtApp } from '#app'

export function useTaggy() {
  // Get the Taggy client instance from the plugin using provide/inject pattern
  const { $taggy } = useNuxtApp()
  const taggyClient = $taggy as TaggyClient

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

  return {
    // Client instance
    client: taggyClient,

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
  }
}
