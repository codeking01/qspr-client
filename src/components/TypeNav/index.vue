<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">QSAR-LAB</el-menu-item>
    <div class="flex-grow"/>
    <el-sub-menu index="1">
      <template #title>画图</template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
      <el-menu-item index="1-3">item three</el-menu-item>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
        <el-menu-item index="1-4-2">item two</el-menu-item>
        <el-menu-item index="1-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const router=useRouter()
const activeIndex = ref('0')
const handleSelect = (key  ,keyPath ) => {
  router.push({path: key, query: {id: 10}})
}
</script>

<style scoped lang="less">

.flex-grow {
  flex-grow: 1;
}
</style>
