<template>
  <div class="form_table">
    <el-card class="box-card" shadow="always">
      <template #header>
        <el-breadcrumb separator="/" v-show="TableProperty.flag">
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item>{{ TableProperty.category }}</el-breadcrumb-item>
          <el-breadcrumb-item>
            <!--            <a href="#">{{ TableProperty.property }}</a>-->
            {{ TableProperty.property }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ TableProperty.model }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-show="!TableProperty.flag">
          首页展示
        </el-breadcrumb>
      </template>
      <el-form ref="formRef" :model="add_form" label-width="80px"
               size="default"
               label-position="right">

        <el-form-item v-if="isShow('boiling_point')" label="沸点" prop="boiling_point" :rules="rules">
          <el-input v-model.number="add_form.boiling_point" type="text" autocomplete="off"
                    input-style="width :150px"/>
        </el-form-item>
        <el-form-item v-if="isShow('temperature')"  label="温度" prop="temperature" :rules="rules">
          <el-input v-model.number="add_form.temperature" type="text" autocomplete="off"
                    input-style="width :150px"/>
        </el-form-item>
        <el-form-item v-if="isShow('pressure')"  label="压力" prop="pressure" :rules="rules">
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
            size="default"
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

<script setup>
import {inject, onMounted, reactive, ref, watch} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import {throttle} from 'lodash';
// import {useRouter} from "vue-router";
import my_mitt from "@/utils/Mitt/my_mitt.js";

let TableProperty = reactive({
  'category': '',
  'property': '',
  'model': '',
  'compute_property': ['boiling_point', 'temperature'],
  'flag': false,
})
// 计算饱和蒸汽压和一部分特殊的模型的时候才需要温度沸点的,点击模型的时候，会修改这个属性内容
const isShow = (property) => {
  // console.log(TableProperty.compute_property.indexOf(property))
  if (TableProperty.compute_property.indexOf(property) == -1) {
    return false;
  }
  return true;
}
const axios = inject("axios")
// 后台返回的数据
const Pred_result = ref()
// 上传的文件
const uploadFile = ref()
// 用来校验表单
const formRef = ref()
// const router = useRouter()

// todo 将TableProperty的compute_property赋值给add_form
const add_form = reactive({
  boiling_point: null,
  temperature: null,
  pressure: null
})


let fd = reactive(new FormData())
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
    ElMessage.error('只能上传Gjf格式的文件');//限制文件类型
    uploadFile.value.clearFiles()
  } else {
    fd.set('file', file.raw)
  }
}

// 覆盖上一个文件
const handleExceed = (files) => {
  if (files[0].name.split('.')[1] !== 'gjf') {
    ElMessage.error('只能上传Gjf格式的文件');//限制文件类型
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
  uploadFile.value.clearFiles()
  fd.delete('file')
}


// const handleSelect = (key, keyPath) => {
//   // console.log(key, keyPath)
//   // 处理处理路由
//   router.push({path: key, query: {id: 10}})
// }

onMounted(() => {
  // for (let item of TableProperty.compute_property) {
  //   let property = Object.keys(item)[0]
  // }
  // 将TableProperty的compute_property依次赋值
  for (let item of TableProperty.compute_property) {
    let property = Object.keys(item)[0]
    fd.set(`${property}`, '')
  }
  // fd.set('boiling_point', add_form.boiling_point)
  // fd.set('temperature', add_form.temperature)
  // console.log('*****',fd)
  my_mitt.on('selectModel', data => {
    TableProperty.flag = true;
    // console.log('****',data)
    TableProperty.category = data[0]
    TableProperty.property = data[1]
    TableProperty.model = data[2]
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