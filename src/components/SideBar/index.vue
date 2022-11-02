<template>
  <el-menu :default-openeds="['', ]" unique-opened show-timeout="10">
    <div v-for="(item,index) in typeNav">
      <el-sub-menu :index="item.id">
        <template #title>
          {{ item.substance_name }}
        </template>
        <div v-for="(category_item,index) in item.category.category">
          <div v-if="isShowCategory(item.substance_name,category_item.category_name)">
            <el-sub-menu :index="category_item.id">
              <template #title>
                {{ category_item.category_name }}
              </template>
              <div v-for="(Property_item,index) in category_item.Property.Property">
                <el-menu-item :index="Property_item.id"
                              @click="toFormTable(item.substance_name,category_item.category_name,Property_item)">
                  {{ Property_item.property_name }}
                </el-menu-item>
              </div>
            </el-sub-menu>
          </div>
          <div v-if="!isShowCategory(item.substance_name,category_item.category_name)">
            <div v-for="(Property_item,index) in category_item.Property.Property">
              <el-menu-item :index="Property_item.id"
                            @click="toFormTable(item.substance_name,category_item.category_name,Property_item)">
                {{ Property_item.property_name }}
              </el-menu-item>
            </div>
          </div>
        </div>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup>
import my_mitt from "@/utils/Mitt/my_mitt.js"
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

// 请求后台接口，获取导航栏数据
let typeNav = ref({})
let currentPropertyId = ref()
const isShowCategory = (substance_name, category_name) => {
  return substance_name !== category_name;
}

const toFormTable = async (substance_name, category_name, Property_item) => {
  my_mitt.emit("ChangePropertyFlag",{
    Property_flag:false
  })
  console.log('***', substance_name, category_name, Property_item)
  if (currentPropertyId.value !== Property_item.id) {
    let data = {
      'substance_name': substance_name,
      'category_name': category_name,
      'Property_item': Property_item
    }
    currentPropertyId.value = Property_item.id
    // router.push({path: key})
    if (substance_name === category_name) {
      // 路径单一
      await router.push({
        path: `${category_name}`,
        query: {substance_name: substance_name, property_name: Property_item.property_name}
      })
      my_mitt.emit("selectProperty", data)
    }
  }
}

my_mitt.on("sideBarData", data => {
  typeNav.value = data.Substance
})

</script>

<style lang="less" scoped>

</style>