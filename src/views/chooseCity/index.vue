<template>
  <div class="">
    <my-choose-city @changeCity="onChange" @changeProvince="changeProvince"></my-choose-city>
  </div>
</template>

<script lang="ts" setup>
import { City } from '../../components/chooseCity/src/type';
let onChange = (item: City) => {
  console.log(item);
}
let changeProvince = (item: string) => {
  console.log(item);
}
</script>

<style lang="scss" scoped>

</style>