<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">QSAR-LAB</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item index="1">饱和蒸汽压</el-menu-item>
    <el-menu-item index="2">Processing Center</el-menu-item>
    <el-menu-item index="3">Processing Center</el-menu-item>
    <el-menu-item index="4">Processing Center</el-menu-item>
    <el-sub-menu index="5">
      <template #title>Workspace</template>
      <el-menu-item index="5-1">item one</el-menu-item>
      <el-menu-item index="5-2">item two</el-menu-item>
      <el-menu-item index="5-3">item three</el-menu-item>
      <el-sub-menu index="5-4">
        <template #title>item four</template>
        <el-menu-item index="5-4-1">item one</el-menu-item>
        <el-menu-item index="5-4-2">item two</el-menu-item>
        <el-menu-item index="5-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
  <div class="form_table">
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-form-inline" size="large"
             label-position="right">
      <el-form-item label="温度" prop="temperature" :rules="[
                        { required: true, message: '这个是必填的！' },
                        { type: 'number', message: '请输入数字！' },]"
      >
        <el-input v-model.number="numberValidateForm.temperature" type="text" autocomplete="off"
                  input-style="width :150px"/>
      </el-form-item>
      <el-form-item label="沸点" prop="boiling_point" :rules="[
                        { required: true, message: '这个是必填的！' },
                        { type: 'number', message: '请输入数字！' },]"
      >
        <el-input v-model.number="numberValidateForm.boiling_point" type="text" autocomplete="off"
                  input-style="width :150px"/>
      </el-form-item>
      <el-form-item label="Gjf文件" :prop="numberValidateForm.file" :rules="[
                        { required: true, message: '请选择文件' },
                        { type: 'file', message: '请选择文件' },]"
      >
        <el-upload
            ref="uploadFile"
            action="http://127.0.0.1:8000/test/"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="handleUpload"
            accept=".gjf"
            class="left-view"
            :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button>
          <template #tip>
            <div class="el-upload__tip text-red">
              limit 1 file, new file will cover the old file
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="result_table">
      <el-descriptions
          title=""
          direction="vertical"
          :column="4"
          size="large"
          :limit="1"
          border
      >
        <el-descriptions-item label="温度（Kpa）">{{ numberValidateForm.temperature }}</el-descriptions-item>
        <el-descriptions-item label="沸点（Kpa）">{{ numberValidateForm.boiling_point }}</el-descriptions-item>
        <el-descriptions-item label="选择的文件">{{ numberValidateForm.file }}</el-descriptions-item>
        <el-descriptions-item label="结果">
          123.115
        </el-descriptions-item>
      </el-descriptions>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {inject, reactive, ref} from 'vue'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {ElMessage, genFileId} from 'element-plus'

// 用来校验表单
const formRef = ref()

// 表单内容
const numberValidateForm = reactive({
  temperature: '',
  boiling_point: '',
  file: {},
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let result = await axios.post('/test/', numberValidateForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result);
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const axios = inject("axios")

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

const handleUpload = async (file) => {
  if (file.name.split('.')[1] != "gjf") {
    alert("请选择Gjf文件！")
    return false
  } else if (file.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不能超过10MB!')
    return false
  }

  numberValidateForm.file = file
  console.log("***", numberValidateForm.file)
}
</script>

<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}

.form_table {
  margin-top: 50px;
  margin-left: 50px;
  text-align: center
}

.el-descriptions {
  margin-top: 20px;
}

.result_table {
  margin: 40px;
  text-align: center
}
</style>