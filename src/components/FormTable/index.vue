<template>
  <div class="form_table">
    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span>{{ TableProperty.model }}</span>
        </div>
      </template>
      <el-form ref="formRef" :model="add_form" label-width="80px" class=""
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
        <el-form-item class="upload-button" style="text-align: left" label="gjf文件" :rules="[
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
      </el-form>
      <div class="result_table" v-if="Pred_result">
        <el-descriptions
            title=""
            direction="vertical"
            :column="4"
            size="large"
            :limit="1"
            border
        >
          <el-descriptions-item label="温度（Kpa）">{{ Pred_result.temperature }}</el-descriptions-item>
          <el-descriptions-item label="沸点（Kpa）">{{ Pred_result.boiling_point }}</el-descriptions-item>
          <el-descriptions-item label="选择的文件">{{ Pred_result.file_name }}</el-descriptions-item>
          <el-descriptions-item label="结果">
            {{ Pred_result.p_cul }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {inject, onMounted, reactive, ref, watch} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import {throttle} from 'lodash';
import {useRouter} from "vue-router";
// //  接受父组件传递过来需要渲染的表属性
// const props = defineProps({
//   TableProperty: Object,
//   // test: Object,
// })
let TableProperty=reactive({
  'model': '未选择模型',
})
// 计算饱和蒸汽压和一部分特殊的模型的时候才需要温度沸点的,点击模型的时候，会修改这个属性内容
defineExpose({
  TableProperty
})

const axios = inject("axios")
// 后台返回的数据
const Pred_result = ref()
// 上传的文件
const uploadFile = ref()
// 用来校验表单
const formRef = ref()
const router = useRouter()

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
  } else {
    fd.set('file', file.raw)
  }
}
// 覆盖上一个文件
const handleExceed = (files) => {
  if (files[0].name.split('.')[1] !== 'gjf') {
    ElMessage.error('只能上传Gjf格式的文件');//限制文件类型
    uploadFile.value!.clearFiles()
  } else {
    uploadFile.value!.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadFile.value!.handleStart(file)
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
        let result = await axios.post('/OrganicMatter/SaturatedVaporPressure', fd)
        // console.log(result.data.result)
        if (result.status == 200) {
          Pred_result.value = result.data
          // console.log(Pred_result.value)
        } else {
          // todo 返回有误处理
        }
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
  uploadFile.value!.clearFiles()
  fd.delete('file')
}

const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  // 处理处理路由
  router.push({path: key, query: {id: 10}})
}

onMounted(() => {
  fd.set('temperature', add_form.temperature)
  fd.set('boiling_point', add_form.boiling_point)
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