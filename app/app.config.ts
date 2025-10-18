export default defineAppConfig({
  // ui: {
  //   global: true,
  //   notifications: {
  //     position: 'top-0 bottom-[unset]'
  //   }
  // }
})
function defineAppConfig<T extends Record<string, any>>(config: T): T {
  return config;
}
