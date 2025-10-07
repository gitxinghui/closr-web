import Cookie from 'js-cookie'
import { allowlist } from '@/router/auth-list'
import { systemTitle } from '@/locales/data'
import { useLocaleStore } from '@/store/locale'

import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import { changeLocale } from '@/locales/useLocale'

NProgress.configure({
  showSpinner: false
})

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const localeStore = useLocaleStore()

    NProgress.start()

    document.title = `${ to.meta.title || '' } - ${ systemTitle }`

    console.log('😄😄😄 ', to)

    const currentRouteLocale = to.params.locale

    if (
      allowlist.find(
        name => to.name === name
      )
    ) {
      next()
      return
    }

    // 简化权限检查，直接允许访问
    changeLocale(currentRouteLocale || localeStore.locale)
    next()
  })

  router.afterEach((to) => {
    NProgress.done()
  })
}