# Taggy SDK Nuxt 3 Module

This document provides instructions for implementing a Nuxt 3 module for the Taggy SDK, focusing on the `useTaggy` composable and potential directives.

## Module Structure

The Taggy SDK Nuxt 3 module should follow this structure:

```
taggy-nuxt/
├── playground/           # Test Nuxt app for development
├── src/                  # Module source code
│   ├── module.ts         # Main module entry point
│   ├── runtime/          # Runtime code
│   │   ├── composables/  # Vue composables
│   │   │   └── useTaggy.ts  # Main composable
│   │   ├── directives/   # Vue directives
│   │   │   └── vTaggy.ts # Taggy directive
│   │   ├── plugins/      # Nuxt plugins
│   │   │   └── taggy.ts  # Plugin to initialize Taggy client
│   │   └── types.ts      # Type definitions
│   └── types.ts          # Module type definitions
├── package.json          # Package metadata
└── tsconfig.json         # TypeScript configuration
```

## Implementation Guide

### 1. The `useTaggy` Composable

The `useTaggy` composable should be the primary way for Nuxt applications to interact with the Taggy SDK. It should provide access to the Taggy client and its services while handling authentication and state management.

#### Implementation Details

```typescript
// src/runtime/composables/useTaggy.ts
import { TaggyClient } from 'taggy-sdk'
import { useState, useRuntimeConfig } from '#app'

export function useTaggy() {
  // Get the Taggy client instance from the plugin
  const taggyClient = useState<TaggyClient>('taggy:client')
  
  // Get the runtime config
  const config = useRuntimeConfig()
  
  // Authentication state
  const isAuthenticated = useState<boolean>('taggy:authenticated', () => false)
  const user = useState<any>('taggy:user', () => null)
  
  // Provide access to all Taggy services
  const auth = taggyClient.value.auth
  const content = taggyClient.value.content
  const tags = taggyClient.value.tags
  const archive = taggyClient.value.archive
  const collections = taggyClient.value.collections
  const files = taggyClient.value.files
  const likes = taggyClient.value.likes
  const media = taggyClient.value.media
  const search = taggyClient.value.search
  const sharing = taggyClient.value.sharing
  const extension = taggyClient.value.extension
  const ai = taggyClient.value.ai
  const comments = taggyClient.value.comments
  const system = taggyClient.value.system
  
  // Helper functions for common operations
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login({ email, password })
      isAuthenticated.value = true
      user.value = response.user
      return response
    } catch (error) {
      isAuthenticated.value = false
      user.value = null
      throw error
    }
  }
  
  // Logout function
  const logout = async () => {
    try {
      await auth.logout()
      isAuthenticated.value = false
      user.value = null
    } catch (error) {
      throw error
    }
  }
  
  // Get current user
  const getCurrentUser = async () => {
    try {
      const response = await auth.getCurrentUser()
      isAuthenticated.value = true
      user.value = response.user
      return response
    } catch (error) {
      isAuthenticated.value = false
      user.value = null
      throw error
    }
  }
  
  return {
    // Client instance
    client: taggyClient.value,
    
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
    login,
    logout,
    getCurrentUser,
  }
}
```

### 2. Taggy Directives

Vue directives can enhance the developer experience by providing declarative ways to interact with the Taggy SDK.

#### v-taggy-content Directive

This directive can be used to easily display and manage Taggy content items.

```typescript
// src/runtime/directives/vTaggy.ts
import { defineNuxtPlugin } from '#app'
import { TaggyClient } from 'taggy-sdk'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('taggy-content', {
    mounted: async (el, binding) => {
      const taggyClient = useState<TaggyClient>('taggy:client').value
      
      // Get content ID from binding value
      const contentId = binding.value
      
      try {
        // Fetch content from Taggy API
        const content = await taggyClient.content.getById(contentId)
        
        // Update element with content data
        el.innerHTML = content.title
        el.dataset.taggyContent = JSON.stringify(content)
        
        // Add click handler for content interaction if modifier is present
        if (binding.modifiers.interactive) {
          el.addEventListener('click', () => {
            // Handle content interaction
          })
        }
      } catch (error) {
        console.error('Error fetching Taggy content:', error)
      }
    }
  })
})
```

#### v-taggy-tags Directive

This directive can be used to display and manage tags for a content item.

```typescript
// src/runtime/directives/vTaggy.ts (continued)
nuxtApp.vueApp.directive('taggy-tags', {
  mounted: async (el, binding) => {
    const taggyClient = useState<TaggyClient>('taggy:client').value
    
    // Get content ID from binding value
    const contentId = binding.value
    
    try {
      // Fetch tags for content
      const tags = await taggyClient.tags.list({ contentId })
      
      // Create tag elements
      const tagElements = tags.items.map(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('taggy-tag')
        tagEl.textContent = tag.name
        return tagEl
      })
      
      // Add tags to element
      el.append(...tagElements)
      
      // Add interactive tag management if modifier is present
      if (binding.modifiers.editable) {
        // Add UI for adding/removing tags
      }
    } catch (error) {
      console.error('Error fetching Taggy tags:', error)
    }
  }
})
```

### 3. Plugin Implementation

The Taggy plugin initializes the TaggyClient and makes it available throughout the application.

```typescript
// src/runtime/plugins/taggy.ts
import { defineNuxtPlugin, useState, useRuntimeConfig } from '#app'
import { TaggyClient } from 'taggy-sdk'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Create Taggy client instance
  const taggyClient = new TaggyClient({
    baseUrl: config.public.taggy.baseUrl,
    auth: {
      // Use token from cookie or localStorage if available
      getToken: () => {
        // Implementation depends on your auth strategy
        return Promise.resolve(localStorage.getItem('taggy_token') || '')
      }
    }
  })
  
  // Store client in state for use in composables
  useState('taggy:client', () => taggyClient)
  
  // Make client available in Nuxt app
  nuxtApp.provide('taggy', taggyClient)
})
```

### 4. Module Configuration

The module should be configurable through the Nuxt configuration.

```typescript
// src/module.ts
import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'

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
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    baseUrl: 'https://api.taggy.com/api/v1',
    debug: false
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
        debug: options.debug
      }
    )
  }
})
```

## Installation and Usage

### Installation

```bash
# npm
npm install taggy-sdk @taggy/nuxt

# yarn
yarn add taggy-sdk @taggy/nuxt

# pnpm
pnpm add taggy-sdk @taggy/nuxt
```

### Configuration in nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@taggy/nuxt'],
  
  taggy: {
    baseUrl: 'https://api.taggy.com/api/v1',
    apiKey: 'your-api-key', // Optional
    debug: true // Optional
  }
})
```

### Using the Composable

```vue
<template>
  <div>
    <h1>My Taggy Content</h1>
    
    <!-- Display content items -->
    <div v-for="item in contentItems" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
      
      <!-- Display tags -->
      <div class="tags">
        <span v-for="tag in item.tags" :key="tag.id" class="tag">
          {{ tag.name }}
        </span>
      </div>
    </div>
    
    <!-- Using directives -->
    <div v-taggy-content="contentId"></div>
    <div v-taggy-tags:editable="contentId"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaggy } from '#imports'

// Get Taggy services
const { content, tags, isAuthenticated } = useTaggy()

// Content state
const contentItems = ref([])
const contentId = ref('example-content-id')

// Fetch content on mount
onMounted(async () => {
  try {
    // Get content list
    const response = await content.list({ limit: 10 })
    contentItems.value = response.items
    
    // For each content item, fetch its tags
    for (const item of contentItems.value) {
      const tagsResponse = await tags.list({ contentId: item.id })
      item.tags = tagsResponse.items
    }
  } catch (error) {
    console.error('Error fetching content:', error)
  }
})
</script>
```

### Authentication Example

```vue
<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Welcome, {{ user?.name }}!</p>
      <button @click="handleLogout">Logout</button>
    </div>
    <form v-else @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaggy } from '#imports'

const { login, logout, isAuthenticated, user } = useTaggy()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    // Reset form
    email.value = ''
    password.value = ''
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
```

## Best Practices

1. **State Management**: Use Nuxt's built-in state management with `useState` for storing authentication state and user information.

2. **Error Handling**: Implement proper error handling in your composables and components to gracefully handle API errors.

3. **TypeScript**: Leverage TypeScript for better type safety and developer experience.

4. **SSR Compatibility**: Ensure the module works correctly in both client-side and server-side rendering contexts.

5. **Authentication**: Implement a robust authentication strategy that works with Nuxt's SSR capabilities.

6. **Caching**: Consider implementing caching for frequently accessed data to improve performance.

7. **Lazy Loading**: Use dynamic imports to lazy-load the Taggy SDK when needed to reduce initial bundle size.

## Advanced Features

### Auto-Refresh Tokens

Implement token refresh logic in the plugin to automatically refresh expired authentication tokens.

### Content Caching

Implement a caching layer to reduce API calls for frequently accessed content.

### Offline Support

Add support for offline operations by caching content and synchronizing changes when the connection is restored.

### Server Routes

Create server routes for server-side operations that require authentication or should not be exposed to the client.

## Conclusion

This document provides a comprehensive guide for implementing a Nuxt 3 module for the Taggy SDK. By following these instructions, you can create a module that provides a seamless integration between Nuxt applications and the Taggy platform, with a focus on developer experience and type safety.

The `useTaggy` composable provides a convenient way to access all Taggy services and common operations, while directives offer declarative ways to interact with Taggy content and tags. The module is designed to be flexible, configurable, and easy to use, making it a valuable addition to any Nuxt project that needs to interact with the Taggy platform.