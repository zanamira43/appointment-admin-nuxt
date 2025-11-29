import ckb from './locales/ckb.json'
import ckbInvoice from './locales/ckb-invoice.json'
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'ckb',
  messages: {
    ckb: {
      ...ckb,
      ...ckbInvoice
    }
  },
}))