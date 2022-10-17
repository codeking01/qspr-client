<template>
  <div v-show="!TableProperty.flag">
    <show-home/>
  </div>
  <div class="form_table" v-show="TableProperty.flag">
    <el-card class="box-card" shadow="always">
      <template #header>
        <el-breadcrumb separator="/" v-show="TableProperty.flag">
          <el-breadcrumb-item>{{ TableProperty.category }}</el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ TableProperty.property }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ TableProperty.model }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <el-form ref="formRef" :model="add_form" label-width="80px" size="default" label-position="right">
        <el-form-item v-if="isShow('boiling_point')" label="沸点" prop="boiling_point" :rules="rules">
          <el-input v-model.number="add_form.boiling_point" type="text" autocomplete="off"
                    input-style="width :150px"/>
        </el-form-item>
        <el-form-item v-if="isShow('temperature')" label="温度" prop="temperature" :rules="rules">
          <el-input v-model.number="add_form.temperature" type="text" autocomplete="off"
                    input-style="width :150px"/>
        </el-form-item>
        <el-form-item v-if="isShow('pressure')" label="压力" prop="pressure" :rules="rules">
          <el-input v-model.number="add_form.pressure" type="text" autocomplete="off"
                    input-style="width :150px"/>
        </el-form-item>

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
      <div class="result_table" v-if="Pred_result">
        <el-descriptions
            title=""
            direction="vertical"
            :column="5"
            size="default"
            :limit="1"
            border
        >
          <el-descriptions-item label="沸点（Kpa）" v-if="isShow('boiling_point')">
            {{ Pred_result.boiling_point }}
          </el-descriptions-item>
          <el-descriptions-item label="温度（Kpa）" v-if="isShow('temperature')">
            {{ Pred_result.temperature }}
          </el-descriptions-item>
          <el-descriptions-item label="压力（Kpa）" v-if="isShow('pressure')">
            {{ Pred_result.pressure }}
          </el-descriptions-item>
          <el-descriptions-item label="选择的文件">{{ Pred_result.file_name }}</el-descriptions-item>
          <el-descriptions-item label="结果">
            {{ Pred_result.p_cul }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref, watch} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import {throttle} from 'lodash';
import my_mitt from "@/utils/Mitt/my_mitt.js";
import {getCyclodextrin, getSaturatedVaporPressure} from "@/api/index.js";
import ShowHome from "@/components/ShowHome/index.vue";

let TableProperty = reactive({
  'category': '',
  'property': '',
  'model': '',
  'compute_property': [],
  'flag': false,
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
  pressure: null
})


let fd = reactive(new FormData())
// 计算饱和蒸汽压和一部分特殊的模型的时候才需要温度沸点的,点击模型的时候，会修改这个属性内容
const isShow = (property) => {
  if (TableProperty.compute_property.indexOf(property) == -1) {
    return false;
  }
  return true;
}

watch(add_form, () => {
  fd.set('boiling_point', add_form.boiling_point)
  fd.set('temperature', add_form.temperature)
  fd.set('pressure', add_form.pressure)
})
const rules = [
  {required: true, message: '这个是必填的！'},
  {type: 'number', message: '请输入数字！'},]

const handleChange = async (file) => {
  if (file.name.split('.')[1] !== 'gjf') {
    ElMessage.error('只能上传Gjf或者mol格式的文件');//限制文件类型
    uploadFile.value.clearFiles()
  } else {
    fd.set('file', file.raw)
  }
}

// 覆盖上一个文件
const handleExceed = (files) => {
  if (files[0].name.split('.')[1] !== 'gjf') {
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
        Pred_result.value =  await getSaturatedVaporPressure(fd)
        // Pred_result.value =  await getCyclodextrin(1,fd)
        // console.log('Pred_result.value',Pred_result.value)
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
  my_mitt.on('selectProperty', data => {
    // console.log('data', data)
    TableProperty.flag = true;
    // console.log('****',data)
    TableProperty.category = data.substance_name;
    TableProperty.property = data.category_name;
    TableProperty.model = data.Property_item.property_name;
    TableProperty.compute_property = data.Property_item.compute_name;
  })
})
</script>

<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}

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
  //width: 800px;
  height: 520px;
}
</style>