<template>
  <div class="table_data">
    <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 5px">添加</el-button>
    <el-table class="el-card" :data="tableData" style="width: 30%" border>
      <el-table-column label="计算方法" prop="model_name" id="id"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加计算模型">
    <el-form :model="form">
      <el-form-item label="计算方法" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add_compute_model">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";

let dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const axios = inject("axios")

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const form = reactive({
  name: '',
})

// 从后台读取数据
const tableData = ref([])
const add_compute_model = async () => {
  let result = await axios.post('/backend/calculate_model/add_calculate_model',form)
  dialogFormVisible = false
  console.log(result)
}

const loadTableData = async () => {
  let result = await axios.get('/backend/calculate_model/calculate_model')
  if (result.status == 200) {
    tableData.value = result.data.calculate_model
  }
  console.log(tableData.value)
}
onMounted(() => {
  loadTableData()
})

</script>
<style lang="less" scoped>
.table_data {
  margin: 20px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>