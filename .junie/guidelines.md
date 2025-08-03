# Taggy Module Development Guidelines

This document provides essential information for developing and maintaining the Taggy Module project.

## Build and Configuration

### Setup and Installation

```bash
# Install dependencies using pnpm (recommended)
pnpm install

# Alternatively, using npm
npm install
```

### Development Workflow

The project uses the following development workflow:

```bash
# Prepare the development environment
npm run dev:prepare

# Run the development server with playground
npm run dev

# Build the playground
npm run dev:build
```

### Build Process

The module is built using `@nuxt/module-builder`:

```bash
# Build the module
npm run prepack
```

### Release Process

To release a new version:

```bash
npm run release
```

This will:
1. Run linting
2. Run tests
3. Build the module
4. Generate a changelog
5. Publish to npm
6. Push git tags

## Testing

### Test Structure

- Tests are located in the `test/` directory
- End-to-end tests use `@nuxt/test-utils`
- Unit tests use Vitest
- Test fixtures are in `test/fixtures/`

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run type checking
npm run test:types
```

### Creating New Tests

#### Unit Tests

Create a new `.test.ts` file in the `test/` directory:

```typescript
import { describe, it, expect } from 'vitest'

describe('feature name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'some input'
    
    // Act
    const result = someFunction(input)
    
    // Assert
    expect(result).toBe('expected output')
  })
})
```

#### End-to-End Tests

For testing with a Nuxt application:

1. Create a fixture in `test/fixtures/` if needed
2. Create a test file using `@nuxt/test-utils`:

```typescript
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('feature name', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/your-fixture', import.meta.url)),
  })

  it('should render correctly', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<expected-content>')
  })
})
```

## Project Structure

### Key Directories

- `src/`: Module source code
  - `module.ts`: Main module definition
  - `runtime/`: Runtime code (plugins, composables)
  - `runtime/server/`: Server-side code
- `test/`: Test files
- `playground/`: Development playground
- `dist/`: Built module (generated)

### Module Development

The module follows the standard Nuxt module structure:

1. Define module options in `src/module.ts`
2. Implement module setup in the `setup` function
3. Add plugins, composables, or server routes as needed

Example of adding a new plugin:

```typescript
// In src/module.ts
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  // ...
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/your-new-plugin'))
  }
})
```

## Code Style and Conventions

- The project uses ESLint for code linting
- TypeScript is used throughout the project
- Follow the existing code style in the project

### Linting

```bash
# Run linting
npm run lint
```

## Publishing

The module is configured to publish to GitHub Packages:

```
"publishConfig": {
  "@chimpanze:registry": "https://npm.pkg.github.com"
}
```

Ensure you have the appropriate authentication set up in your `.npmrc` file.
