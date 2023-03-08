<template>
  <div class="flex">
    <div>
      <my-trend text="营业额" upIcon="CaretTop"></my-trend>
    </div>
    <div>
      <my-trend text="销售额" type="down" downIcon="CaretBottom"></my-trend>
    </div>
  </div> 
<!-- <my-trend text="销售额" type="down"></my-trend> -->
</template> 

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
div{
  margin-right: 10px;
}
</style>  