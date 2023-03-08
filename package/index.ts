import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea"
import trend from "./trend";
import notification from "./notification";
import list from "./list";
import menu from "./menu";
import progress from "./progress";
import chooseTime from "./chooseTime";
import chooseDate from "./chooseDate";
import chooseCity from "./chooseCity";
import form from "./form";
import modalForm from "./modalForm";

import './styles/base.scss'
import './styles/ui.scss'

import * as icons from '@element-plus/icons-vue'
import { toLine } from './utils'
const components = [
  chooseIcon,
  chooseArea,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modalForm
]
export default {
  install(app: App) {
    components.map(item => app.use(item))
    //全局注册图标 ，牺牲点性能
    for (const [key, component] of Object.entries(icons)) {
      app.component(`el-icon-${toLine(key)}`, component)
    }
  }
}
// app.use 会找到install方法