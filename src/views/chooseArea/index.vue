<template>
  <div class="chooseArea"> 
    <my-choose-area @change="changeArea"/>
    {{ area }}
  </div> 
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
let area = ref('')
const changeArea = (val: any) => {
  console.log(val);
  area.value = val
}
</script>

<style lang="scss" scoped>

</style>