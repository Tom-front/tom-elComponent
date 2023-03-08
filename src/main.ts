import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import myComponents from './components/index'
//全量打包引入
// import myComponents from '../lib/tom-element-components.js'
// import '../lib/style.css'
//单独打包引入
// import chooseIcon from '../lib/chooseIcon/index.js'
// import '../lib/chooseIcon/style.css'
import * as icons from '@element-plus/icons-vue'
import { toLine } from './utils'
const app = createApp(App)
//全局注册图标 ，牺牲点性能
for (const [key, component] of Object.entries(icons)) {
  app.component(`el-icon-${toLine(key)}`, component)
}
app.use(router).use(ElementPlus)
app.use(myComponents)
app.mount('#app')
