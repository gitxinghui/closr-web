import { defineStore } from 'pinia'
import { DEFAULT_LANG } from '@/locales/config'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: DEFAULT_LANG
  }),
  
  actions: {
    setLanguage({ locale }: { locale: string }) {
      this.locale = locale
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore()
}
