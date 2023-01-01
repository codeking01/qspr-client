<template>
  <div class="result_table" v-if="isComputed">
    <el-descriptions
        title=""
        direction="vertical"
        :column="5"
        size="default"
        :limit="1"
        border
    >
      <el-descriptions-item label="沸点（K）" v-if="isShow('boiling_point')">
        {{ Pred_result.boiling_point }}
      </el-descriptions-item>
      <el-descriptions-item label="温度（K）" v-if="isShow('temperature')">
        {{ Pred_result.temperature }}
      </el-descriptions-item>
      <el-descriptions-item label="压力（KPa）" v-if="isShow('pressure')">
        {{ Pred_result.pressure }}
      </el-descriptions-item>
      <el-descriptions-item label="选择的文件">{{ Pred_result.file_name }}</el-descriptions-item>
      <el-descriptions-item label="结果(kPa)">
        {{ Pred_result.p_cul }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import my_mitt from "@/utils/Mitt/my_mitt.js";
const isComputed=ref(false)
const Pred_result=ref({
  file_name:''
})
let TableProperty = reactive({
  'compute_property': [],
})
// 计算饱和蒸汽压和一部分特殊的模型的时候才需要温度沸点的,点击模型的时候，会修改这个属性内容
const isShow = (property) => {
  return TableProperty.compute_property.indexOf(property) !== -1;
}
// 如果计算了才显示结果
my_mitt.on("showResult", data=>{
  isComputed.value= data
})
my_mitt.on("predResult", data=>{
  Pred_result.value= data.value
})
my_mitt.on("TableProperty", data=>{
  TableProperty.compute_property=data.split('，')
})

</script>

<style scoped>

</style>