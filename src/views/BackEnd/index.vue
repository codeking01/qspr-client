<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="/">前台</el-menu-item>
    <el-menu-item index="/backend">后台</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item index="/backend/compute_model">计算模型管理</el-menu-item>
    <el-menu-item index="/backend/substance">物质管理</el-menu-item>
    <el-menu-item index="/backend/substance_category">物质分类管理</el-menu-item>
    <el-menu-item index="/backend/property">性质管理</el-menu-item>
  </el-menu>
  <router-view/>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const activeIndex = ref('5')
const handleSelect = (key, keyPath) => {
  // router.push({path: key, query: {id: 10}})
  router.push({path: key})
}
</script>

<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>