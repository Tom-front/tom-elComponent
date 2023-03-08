## 1、全局注册图标，改名el-icon-图标

> elmentUI 改版了，所有图标变成了组件，以SVG形式展示

```js
//main.Ts
import { toLine } from './utils'
*//全局注册图标 ，牺牲点性能*
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
 app.component(`el-icon-${toLine(key)}`, component)
}
```

## 2、封装伸缩菜单组件

> container目录下

```js
//父组件 v-model
<nav-header v-model:isCollapse="isCollapse"/>

//子组件
let props = defineProps<{
  isCollapse: boolean
}>()
let emits = defineEmits(['update:isCollapse'])
const toggle = () => {
  //需要修改父组件的数据
  emits('update:isCollapse',!props.isCollapse)
};
```

## 3、封装图标选择器

```js
      <div class="container">
        <div class="item" v-for="(item,index) in Object.keys(Icons)" :key="index">
          <component :is="`el-icon-${toLine(item)}`"></component>
          <span>{{ item }}</span>
        </div>
      </div>  
```

> component 动态组件； toLine将驼峰转成短横线分割

1、自定义 useCopy hooks 实现复制图标组件功能

```typescript
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
```

## 4、封装省市区三级联动组件

```typescript
//下拉框选择省份的值
let province = ref<string>('')
//下拉框选择城市的值
let city = ref<string>('')
//下拉框选择区域的值
let area = ref<string>('')
//所有省市区数据
let areas = ref(allArea)
 
//城市下拉框的所有的值
let selectCity = ref<AreaItem []>([])
//区域下拉框的所有的值
let selectArea = ref<AreaItem []>([])
```

```typescript
//监听选择省份
watch(() => province.value, val => {
  if (val) {
    let cites = areas.value.find(item => item.code === val)!.children // !是非空断言符号，告诉typescript编译器，变量不应该是null 或undefined
    selectCity.value = cites
  }
  city.value = ''
  area.value = ''
})
//监听选择城市
watch(() => city.value, val => {
  if (val) {
    let area = selectCity.value.find(item => item.code === val)!.children!
    selectArea.value = area
  }
  area.value = ''
})  

//分发事件给父组件
let emits = defineEmits(['change'])
//监听选择区域
watch(() => area.value, val => {
  if (val) {
    let provinceData: Data = {
      name: areas.value.find(item =>item.code === province.value)!.name,
      code: province.value
    }
    let cityData: Data = {
      name: selectCity.value.find(item =>item.code === city.value)!.name,
      code: city.value
    }
    let areaData: Data = {
      name: selectArea.value.find(item =>item.code === val)!.name,
      code: val
    }
    // console.log(provinceData, cityData, areaData);   
    emits('change', {
      province: provinceData, 
      city: cityData,
      area: areaData
    }) 
  }
})  
```

> 监听区域选择框，值变化时向父组件发送事件

## 5、利用app.use特性全局注册组件

```typescript
import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea"

const components = [
  chooseIcon,
  chooseArea
]
export default {
  install(app: App) {
    components.map(item => app.use(item))
  }
}
// app.use 会找到install方法
```

> 利用app.use()特性，封装全局注册组件库的接口

```typescript
//如果需要按需引入，只导入chooseIcon包，chooseIcon目录下也封装了install方法
import chooseIcon from "./chooseIcon";
app.use(chooseIcon)
```

## 6、封装趋势标记组件 

1.利用useSlots api 获取插槽的内容

```typescript
import { useSlots } from 'vue'
let solts = useSlots()
console.log(solts);
```

```html
 <!-- solts.default 是一个函数
如果使用的是具名插槽，通过 solts.插槽名字判断 -->
<slot v-if="solts.default"></slot>
<div v-else>{{text}}</div>
```

![](C:\Users\tom\AppData\Roaming\Typora\typora-user-images\image-20230227131239739.png)

2、动态样式实现，反转颜色

```html
<el-icon-arrow-up :style="{color: reverseColor ? downIconColor : upIconColor}" v-if="type === 'up'"/>
<el-icon-arrow-down :style="{color: reverseColor ? upIconColor : downIconColor}" v-else/>
```

3、动态样式和计算属性实现，反转文字颜色

```typescript
<div class="text" :style="{color: textColor}">
    
//趋势文字的颜色
let textColor = computed(() => {
  if (props.type === 'up') {
    //反转颜色
    return props.reverseColor ? props.downTextColor : props.upTextColor
  } else {
    //反转颜色
    return props.reverseColor ? props.upTextColor : props.downTextColor
    }
}) 
```

## 7、封装通知菜单

 	1、组合el-popover、el-badge（标记）、el-tabs（标签）、el-tag（标签）、el-avatar（头像）

```html
    <el-popover
      :width="300"
      trigger="click">
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot" class="item">
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-popover>
```

2、点击列表 、点击底部按钮 对外分发组件事件

```typescript
let emits = defineEmits(['clickItem','clickAction'])
let clickItem = (item: ListItem, index:number ) => {
    emits('clickItem',{item,index})
}
let clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}
```

## 8、封装导航菜单

1、原菜单非常冗余重复

2、二级菜单（vue模板形式）、无限层级菜单（jsx形式）

**二级菜单（vue模板形式）**

```html
    <el-menu 
    :default-active="defaultActive" 
    :router="router"
    v-bind="$attrs"
    >
    <!-- 将父组件传的除了props之外的值，收集至$attrs
    方便el-menu一次性接收其他属性 -->
```

**多级菜单（jsx形式）**

vite中使用jsx需要先安装插件

```javascript
cnpm i -D @vitejs/plugin-vue-jsx
```

在vite.config.ts 中，导入vueJsx，在plugins数组中，使用vueJsx

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  server: {
    port: 8080
  }
})
```

 3、自定义导航菜单健名

让数据的健名不受限制，省去转换数据的步骤,增强了组件的拓展性

**// 组件外**

```html
<my-menu :data=data1 defaultActive="3-1" active-text-color="red" name="a" index="b" icon="c" children="d"></my-menu>
```

```js
let data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
     d : [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
      }
    ]
  }
]
```

// **组件内**

```js
let props = defineProps({
  //导航菜单的数据
  data: {
    //为了让用户传入自定义的数据，所以使用any
    type: Array as PropType<any[]>,
    required: true
  },
  //默认选中的菜单
  defaultActive: {
    type: String,
    default: ''
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false
  },
  // 自定义键名
  // 菜单标题的键名
  name: {
    type: String,
    default: 'name'
  },
  // 菜单标识的键名
  index: {
    type: String,
    default: 'index'
  },
  // 菜单图标的键名
  icon: {
    type: String,
    default: 'icon'
  },
  // 菜单子菜单的键名
  children: {
    type: String,
    default: 'children'
  }
})
```
> 读取属性值，由item.children 转为item[children]的形式
>


```html
<template>
  <div class=".el-menu-vertical-demo">
    <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
      <!-- 将父组件传的除了props之外的值，收集至$attrs
    方便el-menu一次性接收其他属性 -->
      <template v-for="(item, i) in data" :key="i">
        <!-- 如果没有children 或者 children为空数组，则渲染 el-menu-item -->
        <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
          <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
          <span slot="title">{{ item[name] }}</span>
        </el-menu-item>
        <!-- 如果有children 且 children不为空数组，则渲染 el-sub-menu -->
        <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
          <template #title>
            <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
            <span slot="title">{{ item[name] }}</span>
          </template>
          <el-menu-item v-for="(item1, index1) in item[children]" :index="item1[index]">
            <component v-if="item1[icon]" :is="`el-icon-${toLine(item1[icon])}`"></component>
            <span slot="title">{{ item1[name] }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
```

## 9、封装进度条组件

1、增加了进度条动态加载的功能

```html
//更改p变量，实现动态加载
<el-progress :percentage="p" v-bind="$attrs"></el-progress>
```

```js
let props = defineProps({
  // 进度条进度
  percentage: {
    type: Number,
    required: true
  },
  // 是否有动画效果
  isAnimate: {
    type: Boolean,
    default: false
  },
  // 动画时长(毫秒)
  time: {
    type: Number,
    default: 3000
  },
})
let p = ref(0) // 从0开始加载
onMounted(() => {
  if (props.isAnimate) {
    //规定时间内加载完成
    let t = Math.ceil(props.time / props.percentage) //每t秒钟加载 1/100 (总时长/总进度)
    let timer =  setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    },t)
  } else {
     p.value = props.percentage
  }
})
```

## 10、封装时间选择

1、封装开始、结束时间选择器

> 1、清空开始时间，同时清空结束的时间
>
> 2、没选开始时间，禁言结束时间
>
> 3、选择时间，发送事件至父组件

```js
let emits = defineEmits(['startChange', 'endChange'])
//开始时间
const startTime = ref('')
//结束时间
const endTime = ref('')
let endTimeDisabled = ref<boolean>(true)

watch(() => startTime.value, val => {
  // 如果清空开始时间，同时清空结束的时间
  if (val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
  }
  else {
    //开始时间有值，取消结束时间的禁用
    endTimeDisabled.value = false
    emits('startChange', val)
  }
})
watch(() => endTime.value, val => {
  if (val !== '') {
    emits('endChange', {
      startTime: startTime.value,
      endTime: val
    })
  }
})
```

> v-bind="$attrs.startOptions 父组件props的传值给开始时间

```html
//父组件    
<my-choose-time @startChange="startChange" @endChange="endChange" :startOptions="startOptions"></my-choose-time>
 
//子组件
<div style="margin-right: 20px;">
  <el-time-select v-model="startTime" :max-time="endTime" :placeholder="startPlaceholder" :start="startTimeStart"
    :step="startStep" :end="startTimeEnd" v-bind="$attrs.startOptions"/>
</div>
<div>
  <el-time-select v-model="endTime" :min-time="startTime" :placeholder="endPlaceholder" :start="endTimeStart"
    :step="endStep" :end="endTimeEnd" :disabled="endTimeDisabled" v-bind="$attrs.endOptions"/>
</div>
```

```js
let startOptions = {
  effect: 'dark'
}
```

2、分封装日期选择器

```js
//禁用开始日期的函数
let startDisabledDate = (time: Date) => {
  if(props.disableToday) return time.getTime() < Date.now() - 1000 *60 *60 *24 // 判断 time 的时间戳 是否小于 当前时间 的时间戳减去一天的时间戳
}
// 禁用结束日期的函数
let endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24 // 判断 time 的时间戳 是否小于 当前开始时间 的时间戳加上一天的时间戳
  }
}
```

```html
  <div style="display: flex;">
    <div style="margin-right: 20px;">
      <el-date-picker v-model="startDate" type="date" :placeholder="startPlaceholder" :disabledDate="startDisabledDate"
        v-bind="$attrs.startOptions"></el-date-picker>
    </div>
    <div>
      <el-date-picker v-model="endDate" type="date" :placeholder="endPlaceholder" :disabled="endDateDisabled"
        :disabledDate="endDisabledDate" v-bind="$attrs.endOptions"></el-date-picker>
    </div>
  </div>
```

## 11、城市选择器

1、点击字母区域跳转

> 给每一个el-row 绑定id；调用 el.scrollIntoView()使el跳到视口内

```js
let clickChat = (item: string) => {
  console.log(item);
  let el = document.getElementById(item)
  if (el) el.scrollIntoView() // 原生dom方法，跳转到区域内
  // 不用a标签跳转，因为会产生路由的变化，跳转到空白网页
}
```

```html
        <!-- 字母区域 -->
        <div class="city"> 
          <!-- 循环的是对象，value 在前，key在后 -->
          <div class="city-item" @click="clickChat(key)" v-for="(value, key) in cities">
            {{ key }}
          </div>
        </div>
        <!-- 详细数据区域 -->
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities">
            <el-row style="margin-bottom: 10px;" :id="key">
              <el-col :span="2">{{ key }}：</el-col>
              <el-col :span="22" class="city-name">
                <div class="city-name-item" v-for="(item, index) in value" :key="item.id" @click="clickItem(item)">
                  <div>{{ item.name }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
```

2、自定义过滤

> 选择‘按城市’，*中文和拼音一起过滤*
>
> 选择‘按省份’,*中文过滤*

```js
// 自定义搜索过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2)
  if (val === '') {
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
    }
  }
} 
```

## 12、表单组件

强大的表单组件应该具备：

1**.可配置型**表单，通过js0n对象的方式自动生成表单

2.具备更完善的功能，表单验证，动态删减表单，集成第三方的插件（markdown编辑器，富文本编辑器）

3.用法**简单**，扩展性强，**可维护性**强

4.能够用在**更多的场景**，比如弹框嵌套表单



优化： 

1、优化代码量，

2、动态删减表单项的时候，只需再数组中删除即可
