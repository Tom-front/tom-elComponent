import { App } from "vue"
import chooseTime from './src/index.vue'
export default {
  install(app: App) {
    app.component('my-choose-time', chooseTime)
  }
}