<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>饱和蒸汽压模型</span>
      </div>
    </template>
    <el-form ref="formRef" :model="add_form" label-width="100px" class=""
             size="large"
             label-position="right">
      <el-form-item label="温度" prop="temperature" :rules="[
                        { required: true, message: '这个是必填的！' },
                        { type: 'number', message: '请输入数字！' },]"
      >
        <el-input v-model.number="add_form.temperature" type="text" autocomplete="off"
                  input-style="width :150px"/>
      </el-form-item>
      <el-form-item label="沸点" prop="boiling_point" :rules="[
                        { required: true, message: '这个是必填的！' },
                        { type: 'number', message: '请输入数字！' },]"
      >
        <el-input v-model.number="add_form.boiling_point" type="text" autocomplete="off"
                  input-style="width :150px"/>
      </el-form-item>
      <el-form-item label="gjf文件" :rules="[
                        { required: true, message: '请选择文件' },
                        { type: 'file', message: '请选择文件' },]"
      >
        <el-upload
            style="width: 150px"
            ref="uploadFile"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            accept=".gjf"
            class="left-view"
            :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
      {{ Pred_result }}
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {inject, onMounted, reactive, ref, watch} from "vue";
import {ElMessage, genFileId} from "element-plus";
import { throttle } from 'lodash'

const axios = inject("axios")
// 后台返回的数据
const Pred_result = ref()
// 上传的文件
const uploadFile = ref()
// 用来校验表单
const formRef = ref()

const add_form = reactive({
  temperature: null,
  boiling_point: null,
})
let fd = reactive(new FormData())
watch(add_form, () => {
  fd.set('temperature', add_form.temperature)
  fd.set('boiling_point', add_form.boiling_point)
})

const handleChange = async (file) => {
  if (file.name.split('.')[1] !== 'gjf') {
    ElMessage.error('只能上传Gjf格式的文件');//限制文件类型
    uploadFile.value!.clearFiles()
  }else {
    fd.set('file', file.raw)
    formRef.value.file=file
  }

}
// 覆盖上一个文件
const handleExceed = (files) => {
  if (files[0].name.split('.')[1] !== 'gjf') {
    ElMessage.error('只能上传Gjf格式的文件');//限制文件类型
    uploadFile.value!.clearFiles()
  }else{
    uploadFile.value!.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadFile.value!.handleStart(file)
  }
}
// 处理移除文件时候的操作
const handleRemove=()=>{
  fd.delete('file')
}

const submitForm =throttle((formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(fd.get('file')!==null){
        console.log('ok')
        let result = await axios.post('/test/', fd)
        console.log(result.data.result)
        if (result.status == 200) {
          Pred_result.value = result.data.result
        }else{
          // todo 返回有误处理
          return
        }
      }
      // todo 做一个限流处理 和节流
      ElMessage.error('请选择上传文件！');
    } else {
      return false
    }
  })
},50000)

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  uploadFile.value!.clearFiles()
  fd.delete('file')
}

onMounted(() => {
  fd.set('temperature', add_form.temperature)
  fd.set('boiling_point', add_form.boiling_point)
})

</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin: 50px;
  width: 480px;
}
</style>