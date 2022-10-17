<template>
  <type-nav/>
  <el-container class="layout-container-demo" style="height: 600px">
    <el-aside width="200px">
      <el-scrollbar>
        <side-bar/>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-main>
        <form-table/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TypeNav from "@/components/TypeNav/index.vue";
import SideBar from "@/components/SideBar/index.vue";
import FormTable from "@/components/FormTable/index.vue";
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  /*background: var(--el-color-primary-light-8);*/
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.form_table {
  text-align: -webkit-center;

}

.upload-button {
"text-align": left
}
</style>