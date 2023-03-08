<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="500" trigger="click">
    <template #reference>
      <div class="result">
        <div>{{ result }}</div>
        <div>
          <el-icon-arrow-down :class="{ 'rotate': visible }" />
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="radioValue" size="default">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :span="14">
          <el-select v-model="selectValue" filterable placeholder="请搜索城市" size="default" :filter-method="filterMethod" @change="changeSelect">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.spell" />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <!-- 字母区域 -->
        <div class="city"> 
          <!-- 循环的是对象，value 在前，key在后 -->
          <div class="city-item" @click="clickChat(key)" v-for="(value, key) in cities">
            {{ key }}
          </div>
        </div>
        <!-- 详细数据区域 -->
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities">
            <el-row style="margin-bottom: 10px;" :id="key">
              <el-col :span="2">{{ key }}：</el-col>
              <el-col :span="22" class="city-name">
                <div class="city-name-item" v-for="(item, index) in value" :key="item.id" @click="clickItem(item)">
                  <div>{{ item.name }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <!-- 省份区域 -->
      <template v-else>
        <div class="province">
          <div class="province-item" v-for="(item, index) in Object.keys(provinces)" :key="index"
            @click="clickChat(item)">{{ item }}</div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(item, index) in Object.values(provinces)" :key="index">
            <template v-for="(item1, index1) in item" :key="index1">
              <el-row style="margin-bottom: 10px;" :id="item1.id">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21" class="province-name"> 
                  <div class="province-name-item" v-for="(item2, index2) in item1.data" :key="index2">
                    <div @click="clickProvince(item2)">{{ item2 }}</div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>-
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import city from '../lib/city'
import { City } from './type'
import province from '../lib/province.json'
let emits = defineEmits(['changeCity', 'changeProvince'])
//最终选择的结果
let result = ref<string>('请选择')
//弹出层的显示
let visible = ref<boolean>(false)
// 单选框
let radioValue = ref<string>('按城市')
// 下拉框
let selectValue = ref<string>('')
let options = ref<City[]>([])
//使用城市数据
let cities = ref(city.cities)
// 所有省份的数据
let provinces = ref(province)
// 所有的城市数据
let allCity = ref<City[]>([])

// 点击每个城市
let clickItem = (item: City) => {
  //给结果赋值
  result.value = item.name
  //关闭弹出层
  visible.value = false
  emits('changeCity', item)
}
// 点击字母区域
let clickChat = (item: string) => {
  console.log(item);
  let el = document.getElementById(item)
  if (el) el.scrollIntoView() // 原生dom方法，跳转到区域内
  // 不用a标签跳转，因为会产生路由的变化，跳转到空白网页
}
//点击省份
let clickProvince = (item: string) => {
  // 给结果赋值
  result.value = item
  // 关闭弹出层
  visible.value = false
  emits('changeProvince', item)
}

onMounted(() => {
  // 获取下拉框的城市数据
  let values = Object.values(cities.value).flat(2)
  allCity.value = values
  options.value = values
})
// 自定义搜索过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2)
  if (val === '') {
    options.value = values
  } else {  
    if (radioValue.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
    }
  }
} 
// 下拉框选择
let changeSelect = (val: string) => {
  let city = allCity.value.find(item => item.spell === val)!
  result.value = city.name
  if (radioValue.value === '按城市') {
    emits('changeCity', city)
  } else {
    emits('changeProvince', city.name)
  }
}
</script>

<style lang='scss' scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}

.rotate {
  transform: rotate(180deg);
}

svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}

.container {
  padding: 6px;
}

.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;

  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
  }
}

.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>