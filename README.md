# Taggy SDK Nuxt 3 Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module for the Taggy SDK, providing seamless integration with the Taggy platform.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- 🔌 &nbsp;Easy integration with Taggy SDK
- 🧩 &nbsp;Composable API with `useTaggy()`
- 🔐 &nbsp;Authentication helpers
- 🏷️ &nbsp;Access to all Taggy services (content, tags, collections, etc.)
- 🔄 &nbsp;State management for authentication and user data

## Quick Setup

### Installation

```bash
# npm
npm install @chimpanze/taggy-sdk @chimpanze/taggy-nuxt

# yarn
yarn add @chimpanze/taggy-sdk @chimpanze/taggy-nuxt

# pnpm
pnpm add @chimpanze/taggy-sdk @chimpanze/taggy-nuxt
```

### Configuration

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@chimpanze/taggy-nuxt'],
  
  taggy: {
    baseUrl: 'https://api.taggy.com/api/v1', // Required
    apiKey: 'your-api-key',                  // Optional
    debug: true,                             // Optional
    
    // Optional: Custom authentication configuration
    auth: {
      // Custom function to get the authentication token
      getToken: async () => {
        // Your custom implementation here
        return Promise.resolve('your-auth-token')
      },
    },
  }
})
```

### Authentication Configuration

By default, the module uses `localStorage.getItem('hanko_token')` to retrieve the authentication token. If you need to customize this behavior, you can provide your own `getToken` function in the module configuration:

```typescript
taggy: {
  // ... other options
  auth: {
    getToken: async () => {
      // Example: Get token from a custom storage solution
      return Promise.resolve(myCustomStorage.getAuthToken())
      
      // Example: Get token from a different localStorage key
      // return Promise.resolve(localStorage.getItem('my_custom_token_key'))
      
      // Example: Get token from an authentication service
      // const token = await authService.getToken()
      // return token
    },
  },
}
```

This allows you to integrate with any authentication system or token storage mechanism your application uses.

## Usage

### Using the Composable

```vue
<script setup>
import { useTaggy } from '#imports'

// Get Taggy services
const { content, tags, isAuthenticated, user } = useTaggy()

// Authentication
const login = async (email, password) => {
  try {
    await useTaggy().login(email, password)
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Fetch content
const fetchContent = async () => {
  try {
    const response = await content.list({ limit: 10 })
    return response.items
  } catch (error) {
    console.error('Error fetching content:', error)
    return []
  }
}
</script>
```


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@chimpanze/taggy-nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@chimpanze/taggy-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@chimpanze/taggy-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@chimpanze/taggy-nuxt

[license-src]: https://img.shields.io/npm/l/@chimpanze/taggy-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@chimpanze/taggy-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
