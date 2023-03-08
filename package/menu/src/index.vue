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

<script lang="ts" setup>
import { PropType } from 'vue'
import { toLine } from '../../utils';
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
console.log(props.data);

</script>

<style lang="scss" scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>