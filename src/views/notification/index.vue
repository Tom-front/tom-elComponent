<template>
  <div class="">
    <my-notification :value="99" :max=12 icon="Burger">
      <template #default>
        <my-list @clickAction="clickAction"  @clickItem="clickItem" :list="list" :actions="actions"></my-list>
      </template>
    </my-notification>
  </div>
</template>

<script lang="ts" setup>
import { list , actions } from './data'
console.log(list);
let clickAction = (val : any) => {
  console.log(val);
}
let clickItem = (val: any) => {
  console.log(val);
}
</script>
<style lang="scss" scoped>

</style>  