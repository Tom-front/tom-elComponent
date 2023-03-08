<template>
   <div>
    <el-select clearable  v-model="province" placeholder="请选择省份">
      <el-option v-for="(item) in areas" :key="item.code" :label ="item.name" :value="item.code"> </el-option>
    </el-select>
    <el-select clearable v-model="city" placeholder="请选择城市" :disabled="!province" class="margin">
      <el-option v-for="(item) in selectCity" :key="item.code" :label ="item.name" :value="item.code"> </el-option>
    </el-select>
    <el-select clearable v-model="area" placeholder="请选择区域" :disabled="!province || !city" class="margin">
      <el-option v-for="(item) in selectArea" :key="item.code" :label ="item.name" :value="item.code"> </el-option>
    </el-select>
   </div>
</template>

<script lang="ts" setup>
import { ref ,watch} from 'vue'   
import allArea from '../lib/pca-code.json'

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}

export interface Data {
  name: string,
  code: string
}

//下拉框选择省份的值
let province = ref<string>('')
//下拉框选择城市的值
let city = ref<string>('')
//下拉框选择区域的值
let area = ref<string>('')
//所有省市区数据
let areas = ref(allArea)
 
//城市下拉框的所有的值
let selectCity = ref<AreaItem []>([])
//区域下拉框的所有的值
let selectArea = ref<AreaItem []>([])
//监听选择省份
watch(() => province.value, val => {
  if (val) {
    let cites = areas.value.find(item => item.code === val)!.children // !是非空断言符号，告诉typescript编译器，变量不应该是null 或undefined
    selectCity.value = cites
  }
  city.value = ''
  area.value = ''
})
//监听选择城市
watch(() => city.value, val => {
  if (val) {
    let area = selectCity.value.find(item => item.code === val)!.children!
    selectArea.value = area
  }
  area.value = ''
})  

//分发事件给父组件
let emits = defineEmits(['change'])
//监听选择区域
watch(() => area.value, val => {
  if (val) {
    let provinceData: Data = {
      name: areas.value.find(item =>item.code === province.value)!.name,
      code: province.value
    }
    let cityData: Data = {
      name: selectCity.value.find(item =>item.code === city.value)!.name,
      code: city.value
    }
    let areaData: Data = {
      name: selectArea.value.find(item =>item.code === val)!.name,
      code: val
    }
    // console.log(provinceData, cityData, areaData);   
    emits('change', {
      province: provinceData, 
      city: cityData,
      area: areaData
    }) 
  }
})  


</script>

<style lang="scss" scoped>
.margin {
  margin-left: 20px;
}
</style>