import type { Component } from 'vue'
import * as components from './components'

export * from './components'

const smartAntdVue3ui = {
  install(app: any) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component as Component)
    })
  }
}

export default smartAntdVue3ui