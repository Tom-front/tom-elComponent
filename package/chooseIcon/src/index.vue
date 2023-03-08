<template>
  <el-button type="primary" @click="handClick()">
    <slot>
      {{ btnName }}
    </slot>
  </el-button>
  <el-dialog :title="title" :model-value="visible" @close="onClose">
    <div class="container">
      <div class="item" v-for="(item, index) in Object.keys(Icons)" :key="index" @click="iconClick(item)">
        <component :is="`el-icon-${toLine(item)}`"></component>
        <span>{{ item }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from '../../utils/index'
import { useCopy } from '../../hooks/useCopy'
let props = defineProps<{
  title: string,//弹出框的标题
  visible: boolean,//控制弹出框的显示与隐藏
  btnName: string //按钮文字
}>()
let emit = defineEmits(['update:visible'])

const handClick = () => {
  // 需要修改父组件的数据,对话框开
  emit('update:visible', true)
}
const onClose = () => {
  // 需要修改父组件的数据,对话框关
  emit('update:visible', false)
}

const iconClick = (item: string) => {
  useCopy(`<el-icon-${toLine(item)}/>`)
  onClose()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 500px;
  overflow-y: scroll;
}

.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}

svg {
  width: 2em;
  height: 2em;
}
</style>