<template>
  <div class="trend">
    <div class="text" :style="{color: textColor}">
      <!-- solts.default  是一个函数
      如果使用的是具名插槽，通过 solts.插槽名字判断 -->
      <slot v-if="solts.default"></slot>
      <div v-else>{{text}}</div>
    </div>
    <div class="icon">
      <!-- <el-icon-arrow-up :style="{color: reverseColor ? downIconColor : upIconColor}" v-if="type === 'up'"/>
      <el-icon-arrow-down :style="{color: reverseColor ? upIconColor : downIconColor}" v-else/> -->
       <component :is="`el-icon-${toLine(upIcon)}`" :style="{color: reverseColor ? downIconColor : upIconColor}" v-if="type === 'up'"></component>
       <component :is="`el-icon-${toLine(downIcon)}`" :style="{color: reverseColor ? upIconColor : downIconColor}" v-else></component>
    </div>
  </div>
</template>

<script lang="ts" setup>  
import { useSlots, computed } from 'vue'
import { toLine } from '../../../utils';
let props = defineProps({
  //标记当前趋势是上升（up）还是下降（down）
  type: {
    type: String,
    default: 'up'
  },
  //趋势显示的文字
  //1. 父组件传递过来的值
  //2.插槽
  text: {
    type: String,
    default: '趋势文字'
  },
  // 上升趋势图标颜色
  upIconColor: { 
    type: String,
    default: '#f5222d'
  },
  // 下降趋势的图标颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 上升趋势文字颜色
  upTextColor: { 
    type: String,
    default: 'rbg(0,0,0)'
  },
  // 下降趋势的文字颜色
  downTextColor: {
    type: String,
    default: 'rbg(0,0,0)'
  },
  reverseColor: {
    type: Boolean,
    default: false
  },
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  downIcon: {
    type: String,
    default: 'ArrowDown'
  }
})
//获取插槽内容
let solts = useSlots()
console.log(solts);
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
</script>
 
<style lang="scss" scoped>
.trend {
  display: flex;   
  align-items: center;
  .text {
    font-size: 12px;
    margin-left: 4px;
  }
  .icon {
    svg {  
      width: 0.8em;
      height: 0.8em;
    }
  } 
}

                                                       
</style>