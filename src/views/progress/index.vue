<template>
  <div class="">
    <my-progress type="circle" :percentage="50" isAnimate></my-progress>
    <my-progress type="circle" :percentage="50" isAnimate :time="200"></my-progress>
    <my-progress type="circle" :percentage="50"></my-progress>
    <my-progress :percentage="50"></my-progress>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped></style>