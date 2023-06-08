import type { App } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      formatNumber(number: number): string
      formatCurrency(number: number): string
    }
  }
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$filters = {
      formatNumber(number: number) {
        return Intl.NumberFormat().format(number)
      },
      formatCurrency(number: number) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumSignificantDigits: 1
        }).format(number)
      }
    }
  }
}
