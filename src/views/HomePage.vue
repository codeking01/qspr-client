<template>
  <type-nav/>
  <el-container class="layout-container-demo" style="height: 630px">
      <el-aside width="180px" v-show="flag">
        <el-scrollbar>
          <side-bar/>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <show-home  v-show="!flag"/>
          <div  v-show="Property_flag&&flag">
            请选择左侧需要计算的预测属性！
          </div>
          <router-view/>
        </el-main>
      </el-container>

  </el-container>
</template>

<script setup>
import TypeNav from "@/components/TypeNav/index.vue";
import SideBar from "@/components/SideBar/index.vue";
import ShowHome from "@/components/ShowHome/index.vue";
import {ref} from "vue";
import my_mitt from "@/utils/Mitt/my_mitt.js";
const flag = ref(false)
const Property_flag = ref(true)
my_mitt.on("changeFlag",data=>{
  flag.value=data.flag
})
my_mitt.on("ChangePropertyFlag",data=>{
  Property_flag.value=data.Property_flag
})

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