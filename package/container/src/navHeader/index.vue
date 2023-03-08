<template>
    <div class="header">
      <span @click="toggle()">
        <el-icon-expand v-if="isCollapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
      </span>
    </div>  
</template>

<script lang="ts" setup>
import { ref } from "vue";

let props = defineProps<{
  isCollapse: boolean
}>()
let emits = defineEmits(['update:isCollapse'])
const toggle = () => {
  //需要修改父组件的数据
  emits('update:isCollapse',!props.isCollapse)
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;   
  padding: 0 20px;
  display: flex;
  align-items: center;
}
svg {
  height: 1em;
  width: 1em;
}
</style>