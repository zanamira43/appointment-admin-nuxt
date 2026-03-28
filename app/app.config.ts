export default defineAppConfig({
  ui: {
    table: {
      slots: {
        root: 'border rounded-lg',
        thead: 'rounded-t-lg',
        th: 'bg-gray-800 text-gray-100'
      }
    }
  }
})
function defineAppConfig<T extends Record<string, any>>(config: T): T {
  return config;
}
