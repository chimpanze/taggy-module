export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  taggy: {
    // Example of providing a custom getToken function
    auth: {
      getToken: async () => {
        // This is just an example - in a real app, you might get the token from a different source
        console.log('Using custom getToken function')
        return Promise.resolve('custom_token_example')
      },
    },
  },
})
