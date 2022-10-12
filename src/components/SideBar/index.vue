<template>
  <el-menu :default-openeds="['1']" @select="handleSelect">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <message/>
        </el-icon>
        常规有机物
      </template>
      <el-sub-menu index="1-1">
        <template #title>沸点</template>
        <el-menu-item index="1-1-1">
          <template #title>模型一</template>
        </el-menu-item>
        <el-menu-item index="1-1-2">模型二</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="饱和蒸汽压">
        <template #title>饱和蒸汽压</template>
        <el-menu-item index="1-2-1">
          <template #title>QSPR</template>
        </el-menu-item>
        <el-menu-item index="1-2-2">模型二</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <icon-menu/>
        </el-icon>
        环糊精
      </template>
      <el-menu-item-group>
        <template #title>Group 1</template>
        <el-menu-item index="2-1">Option 1</el-menu-item>
        <el-menu-item index="2-2">Option 2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group 2">
        <el-menu-item index="2-3">Option 3</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="2-4">
        <template #title>Option 4</template>
        <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <setting/>
        </el-icon>
        离子液体
      </template>
      <el-menu-item-group>
        <template #title>Group 1</template>
        <el-menu-item index="3-1">Option 1</el-menu-item>
        <el-menu-item index="3-2">Option 2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group 2">
        <el-menu-item index="3-3">Option 3</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="3-4">
        <template #title>Option 4</template>
        <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {Menu as IconMenu, Message, Setting} from "@element-plus/icons-vue"
import my_mitt from "@/utils/Mitt/my_mitt.js"
import nprogress from "@/utils/nprogress/mynprogress.js"
const handleSelect = (key, keyPath) => {
  // 组件通信
  nprogress.start();
  my_mitt.emit("selectModel",keyPath)
  nprogress.done();
  // TableProperty.model = keyPath[1]
  console.log(keyPath);
}
</script>

<style lang="less" scoped>

</style>