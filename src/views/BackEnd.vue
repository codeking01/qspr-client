<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item index="1">计算模型管理</el-menu-item>
    <el-menu-item index="2">物质管理</el-menu-item>
    <el-menu-item index="3">物质分类管理</el-menu-item>
    <el-menu-item index="3">性质管理</el-menu-item>
  </el-menu>
  <router-view/>
</template>

<script setup>
import {ref} from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>