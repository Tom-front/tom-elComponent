import { ElMessage } from "element-plus"

export const useCopy = async (text: string) => {
  if (navigator.clipboard && navigator.permissions) {
    //Navigator 这种新 API 都是需要事先授予权限的，而权限是通过 Permissions API 获取的
    //Permissions API 在安卓的 WebView 中是没实现的
    //所以在代码里加了 Permissions API的判断
    await navigator.clipboard.writeText(text)
    ElMessage.success('复制成功')
  } else {
    let input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('text') //该特性已经被弃用（但是兼容性好），之所以还能用，是因为有些浏览器还没删除实现。
    document.body.removeChild(input)
    ElMessage.success('复制成功')
  }
}