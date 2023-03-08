<template>
  <div class="">
    <my-choose-time @startChange="startChange" @endChange="endChange" :startOptions="startOptions"></my-choose-time>
    <div style="margin-top: 20px;">
      <my-choose-date :disableToday="false" @startChange="startDateChange" @endChange="endDateChange" :startOptions="startOptions1" :endOptions="endOptions1"></my-choose-date>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface endValue {
  startTime: string,
  endTime: string
}
interface dateEndValue {
  startTime: string,
  endTime: string
}
let startChange = (val: string) => {
  console.log('startChange', val);

}
let endChange = (val: endValue) => {
  console.log('endChange', val);
}

let startDateChange = (val: Date) => {
  console.log('startDateChang', val);

}
let endDateChange = (val: dateEndValue) => {
  console.log('endDateChange', val);
}

let startOptions = {
  effect: 'dark'
}
let startOptions1 = {
  size: 'large'
}
let endOptions1 = {
  size: 'large'
}
</script>

<style lang="scss" scoped></style>