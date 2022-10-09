<template>

<el-input v-model="add_form.temperature"/>
<el-input v-model="add_form.boiling_point"/>
  <el-upload
      ref="uploadFile"
      :limit="1"
      action="http://127.0.0.1:8000/test/"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      accept=".gjf"
      class="left-view"
      :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      提交
    </el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
{{Pred_result}}
</template>

<script lang="ts" setup>
import {inject, onMounted, reactive, ref, watch} from "vue";

const axios = inject("axios")
const Pred_result=ref()

const add_form = reactive({
  temperature: null,
  boiling_point: null,
})
let fd = reactive(new FormData())
watch(add_form,()=>{
  fd.set('temperature',add_form.temperature)
  fd.set('boiling_point',add_form.boiling_point)
})

const handleChange = async (file) => {
  fd.set('file',file.raw)
}

const submitUpload = async () => {
  let result = await axios.post('/test/', fd)
  console.log(result.data.result)
  if(result.status==200) {
    Pred_result.value=result.data.result
  }
}

onMounted(()=>{
  fd.set('temperature',add_form.temperature)
  fd.set('boiling_point',add_form.boiling_point)
})
</script>

<style lang="less" scoped>

</style>