<template>
  <div class="">
    <el-popover :width="300" trigger="click">
      <template #reference>
        <el-badge :value="value" :max="max" :is-dot="isDot" class="item">
          <component :is="`el-icon-${toLine(icon)}`"></component>
        </el-badge>
      </template>
      <template #default>
        <slot></slot>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { toLine } from '../../utils';

let props = defineProps({
  // 显示图标
  icon: {
    type: String,
    default: 'Bell'
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: ''
  },
  // 最大值
  max: {
    type: Number,
    default: 99
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false
  },
})
</script>

<style lang="scss" scoped>
svg {
  height: 1em;
  width: 1em;
}
</style>