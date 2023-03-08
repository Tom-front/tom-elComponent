<template>
  <div class="list">
    <div class="list-tabs__item">
      <el-tabs>
        <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
          <el-scrollbar max-height="300px">
            <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content">
              <div class="avatar">
                <el-avatar size="small" :src="item1.avatar" v-if="item1.avatar"></el-avatar>
              </div>
              <div class="content">
                <div v-if="item1.title" class="title">
                  <div>{{ item1.title }}</div>
                  <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}</el-tag>
                </div>
                <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
                <div class="time" v-if="item1.time">{{ item1.time }}</div>
              </div>
            </div>
          </el-scrollbar>
          <div class="actions">
            <div class="a-item" :class="{ 'border': i !== actions.length }" @click="clickAction(action, i)"
              v-for="(action, i) in actions" :key="i">
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { toLine } from '../../utils';
import { ActionOptions, ListOptions, ListItem } from './types';
let props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    require: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})
let emits = defineEmits(['clickItem', 'clickAction'])
let clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}
let clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background: #e6f6ff;
  }

  .avatar {
    flex: 1;
  }

  .content {
    flex: 3;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;

  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}

.border {
  border-right: 1px solid #eee;
}

svg {
  height: 1em;
  width: 1em;
}
</style>