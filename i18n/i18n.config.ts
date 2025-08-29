import ckb from '~/i18n/locales/ckb.json'
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ckb',
  messages: {
    ckb: ckb,
  },
}))