<template>
  <div style="width: 300px;">
    <!-- <my-menu :data=data1 defaultActive="3-1" active-text-color="red" name="a" index="b" icon="c" children="d"></my-menu> -->
    <my-infinite-menu :data=data2 defaultActive = "3-1-1-1-1" active-text-color="red" name="a" index="b" icon="c" children="d"></my-infinite-menu>
  </div>
</template>

<script lang="ts" setup>
let data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
     d : [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
      }
    ]
  }
]
let data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '3-1-1-1',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '3-1-1-1-1',
                    c: 'Document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style lang="scss" scoped>

</style>