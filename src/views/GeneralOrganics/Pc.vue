<template>
  <div class="container">
    <div class="form_table">
      <el-card class="box-card" shadow="always">
        <template #header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ TableProperty.category }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ TableProperty.model }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <el-form ref="formRef" :model="add_form" label-width="80px" size="default" label-position="right">

          <!--上传gjf是每个模型都必须的 -->
          <el-form-item class="upload-button" style="text-align: left" label="gjf文件">
            <el-upload
                style="width: 150px"
                ref="uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :on-remove="handleRemove"
                accept=".gjf,.mol"
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
        </el-form>
        <!-- 计算结果 -->
        <div class="result_table" v-if="Pred_result">
          <el-descriptions
              title=""
              direction="vertical"
              :column="5"
              size="default"
              :limit="1"
              border
          >
            <el-descriptions-item label="选择的文件">{{ Pred_result.file_name }}</el-descriptions-item>
            <el-descriptions-item label="结果">
              {{ Pred_result.p_cul}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref, watch} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import {throttle} from 'lodash';
import my_mitt from "@/utils/Mitt/my_mitt.js";
import {getPVT} from "@/api/index.js";

let TableProperty = reactive({
  'compute_property': [],
})

const axios = inject("axios")
// 后台返回的数据
const Pred_result = ref()
// 上传的文件
const uploadFile = ref()
// 用来校验表单
const formRef = ref()
const add_form = reactive({
  boiling_point: null,
  temperature: null,
})
let fd = reactive(new FormData())
watch(add_form, () => {
  fd.set('boiling_point', add_form.boiling_point)
  fd.set('temperature', add_form.temperature)
})
const rules = [
  {required: true, message: '这个是必填的！'},
  {type: 'number', message: '请输入数字！'},]

// 文件内容发生改变
const handleChange = async (file) => {
  if (file.name.split('.')[1] !== 'gjf' && file.name.split('.')[1] !== 'mol') {
    ElMessage.error('只能上传Gjf或者mol格式的文件');//限制文件类型
    uploadFile.value.clearFiles()
  } else {
    fd.set('file', file.raw)
  }
}

// 覆盖上一个文件
const handleExceed = (files) => {

  if (files[0].name.split('.')[1] !== 'gjf' && files[0].name.split('.')[1] !== 'mol') {
    ElMessage.error('只能上传Gjf或者mol格式的文件');//限制文件类型
    uploadFile.value.clearFiles()
  } else {
    uploadFile.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadFile.value.handleStart(file)
  }
}
// 处理移除文件时候的操作
const handleRemove = () => {
  fd.delete('file')
}

// 做了节流处理
const submitForm = throttle((formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if (fd.get('file') !== null) {
        Pred_result.value =  await getPVT(fd,'Pc')
      } else {
        ElMessage.error('请选择上传文件！');
      }
    } else {
      return false
    }
  })
}, 500)

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  uploadFile.value.clearFiles()
  fd.delete('file')
}


onMounted(() => {
  for (let item of TableProperty.compute_property) {
    let property = Object.keys(item)[0]
    fd.set(`${property}`, '')
  }
  my_mitt.on('selectProperty', async data => {
    // console.log('****',data)
    TableProperty.category = data.substance_name;
    TableProperty.property = data.category_name;
    TableProperty.model = data.Property_item.property_name;
    TableProperty.compute_property = data.Property_item.compute_name;
  })
})
</script>


<style scoped>
.form_table {
  text-align: -webkit-center;
}

.el-descriptions {
  margin-top: 20px;
}

.result_table {
  margin: 40px;
  text-align: center
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin: 5px 5px;
  height: 585px;
}
</style>