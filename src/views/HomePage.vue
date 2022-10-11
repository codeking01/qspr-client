<template>
  <type-nav/>
  <el-container class="layout-container-demo" style="height: 620px">
    <el-aside width="200px">
      <el-scrollbar>
        <!-- todo 用mitt插件直接组件通信   -->
        <!-- todo 子组件传递内容给父组件，然后再将获取的内容传递给 子组件form-table  -->
        <side-bar/>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            >
              <setting
              />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>添加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <el-main>
        <form-table :TableProperty="TableProperty"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TypeNav from "@/components/TypeNav/index.vue";
import SideBar from "@/components/SideBar/index.vue";
import FormTable from "@/components/FormTable/index.vue";
import {reactive} from "vue";

const TableProperty = reactive({
  model: '',
  name: 'my-dialog',
})

// 根据侧栏选择的模型传递组件内容
TableProperty.model = ""
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