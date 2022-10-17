<template>
  <el-menu :default-openeds="['', ]" unique-opened show-timeout="10">
    <div v-for="(item,index) in typeNav">
      <el-sub-menu :index="item.id">
        <template #title>
          {{ item.substance_name }}
        </template>
<!--        <el-menu-item-group>-->
          <!--          <template #title>物质分类</template>-->
          <div v-for="(category_item,index) in item.category.category">
            <el-sub-menu :index="category_item.id">
              <template #title>{{ category_item.category_name }}</template>
              <div v-for="(Property_item,index) in category_item.Property.Property">
                <el-menu-item :index="Property_item.id"
                              @click="toFormTable(item.substance_name,category_item.category_name,Property_item)">
                  {{ Property_item.property_name }}
                </el-menu-item>
              </div>
            </el-sub-menu>
          </div>
<!--        </el-menu-item-group>-->
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup>
import my_mitt from "@/utils/Mitt/my_mitt.js"
import {ref} from "vue";

const property = ref('结合常数(β-CD)')


// todo 请求后台接口，获取导航栏数据
let typeNav = ref({})

const typeNavList = ref([])
const toFormTable = (substance_name, category_name, Property_item) => {
  let data = {
    'substance_name': substance_name,
    'category_name': category_name,
    'Property_item': Property_item
  }
  // 向表单组件传递内容
  my_mitt.emit("selectProperty", data)
}

my_mitt.on("sideBarData", data => {
  typeNav.value = data.Substance
})

</script>

<style lang="less" scoped>

</style>