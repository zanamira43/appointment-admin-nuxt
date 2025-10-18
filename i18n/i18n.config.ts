import ckb from './locales/ckb.json'
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ckb',
  messages: {
    ckb: ckb,
  },
}))