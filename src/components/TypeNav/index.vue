<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-select"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      menu-trigger="hover"
      show-timeout="10"
  >
    <!--    <el-menu-item index="/">
      QSPR-LAB
    </el-menu-item>-->
    <!--2022.12.29 之前的设置-->
    <!--<el-sub-menu index="#">
      <template #title>{{ selectModel.Name }}</template>
      <div v-for="(item,index) in selectModel.calculateModel.calculate_model">
        <el-menu-item :index="item.id" @click="toSelectModel(item)">{{ item.model_name }}</el-menu-item>
      </div>
    </el-sub-menu>-->
    <el-dropdown split-button type="primary" size="large" class="selectModel">
      {{ selectModel.Name }}
      <template #dropdown>
        <el-dropdown-menu>
          <div v-for="(item,index) in selectModel.calculateModel.calculate_model">
            <el-dropdown-item :index="item.id" @click="toSelectModel(item)">{{ item.model_name }}</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="flex-grow"/>
    <el-menu-item index="/backend/compute_model">
      后台
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useCalculateModel} from "@/stores/TabNavStore.js"
import my_mitt from "@/utils/Mitt/my_mitt.js";

const calculateModel = useCalculateModel()
const router = useRouter()
const activeIndex = ref('/')
let selectModel = reactive({
  Name: "选择模型",
  calculateModel: {},
  typeNavList: {},
});
const handleSelect = (key, keyPath) => {
  // router.push({path: key, query: {id: 10}})
  if (keyPath[0] !== '#') {
    router.push({path: key})
  }
  console.log('key和keyPath:' + key, keyPath)
}
// 选择计算模型的方法
const toSelectModel = async (item) => {
  selectModel.Name = item.model_name
  // 根据选择模型的id 发送请求查找内容（查找三级菜单的内容）
  await calculateModel.loadTypeNavList(item.id)
  selectModel.typeNavList = calculateModel.typeNavList
  // console.log('typeNavList',selectModel.typeNavList)
  // 组件通信，更改侧边导航栏数据
  let data = {
    typeNavList: selectModel.typeNavList,
    item: item
  }
  my_mitt.emit("sideBarData", data)
  my_mitt.emit("changeFlag", {
    flag:true,
  })
}

onMounted(async () => {
  await calculateModel.loadCalculateModel()
  selectModel.calculateModel = calculateModel.calculate_model
})
</script>

<style scoped lang="less">
.el-menu-select{
  vertical-align:middle;
}
.selectModel {
  margin-top: 8px;
}
.flex-grow {
  flex-grow: 1;
}
</style>
