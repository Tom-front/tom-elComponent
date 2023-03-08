<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :isCollapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:isCollapse="isCollapse"/>
      </el-header>
      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue' 
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'
const isCollapse = ref(false)

</script>
 
<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>