<template>
  <div :class="{'my-choose-icon-dialog-body-height': isScroll}">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <my-form ref="form" :options="options" @on-change="onChange" @before-upload="beforeUpload" @on-preview="onPreview"
          @on-remove="onRemove" @before-remove="beforeRemove" @on-success="onSuccess" @on-exceed="onExceed">
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </my-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
import { FormOptions } from '../../form/src/types/types';
let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  // 是否只在可视区域内滚动
  isScroll: {
    type: Boolean,
    default: false
  },
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  },
})
// 表单实例
let form = ref()
let emits = defineEmits(['update:visible'])

let dialogVisible = ref<boolean>(props.visible)
watch(() => props.visible, val => {
  dialogVisible.value = val
})
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>

<style lang="scss" scoped></style>