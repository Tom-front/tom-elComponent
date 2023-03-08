<template>
  <my-choose-icon btnName="选择图标" title="请选择想要的图标" v-model:visible="visible"/>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref<boolean>(false)
</script>

<style lang="scss" scoped>

</style>