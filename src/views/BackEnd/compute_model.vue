<template>
  <div class="table_data">
    <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 5px">添加</el-button>
    <el-table class="el-card" :data="tableData" style="width: 30%" border>
      <el-table-column label="计算方法" prop="model_name" id="id"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-popconfirm title="确定删除？" confirmButtonText="确定"
                         cancelButtonText="取消"
                         icon="el-icon-info"
                         iconColor="red"
                         @confirm="handleDelete(scope.$index, scope.row)"
                         >
            <template #reference>
              <el-button size="small" type="danger" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加计算模型">
    <el-form :model="form">
      <el-form-item label="计算方法" :label-width="formLabelWidth">
        <el-input v-model="form.model_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add_compute_model">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="EditDialogFormVisible" title="编辑计算模型">
    <el-form :model="form">
      <el-form-item label="计算方法" :label-width="formLabelWidth">
        <el-input v-model="form.model_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="edit_compute_model">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

let dialogFormVisible = ref(false)
let EditDialogFormVisible = ref(false)
const formLabelWidth = '140px'
const axios = inject("axios")
const success_tip = (msg) => {
  ElMessage({
    grouping: true,
    message: msg,
    type: 'success',
  })
}

const handleEdit = async (index, row) => {
  // 弹出编辑对话框
  form.model_name = row.model_name;
  form.id = row.id;
  EditDialogFormVisible.value = true;
  // console.log(index, row)
}

const handleDelete = async (index, row) => {
  // console.log('id ', row.id)
  let result = await axios.post('/backend/calculate_model/del_calculate_model?id=' + row.id)
  if (result.status == 200) {
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
  }
}
const form = reactive({
  id: '',
  model_name: '',
})

// 从后台读取数据
const tableData = ref([])
const add_compute_model = async () => {
  let result = await axios.post('/backend/calculate_model/add_calculate_model', form)
  if (result.status == 200) {
    form.model_name = ''
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
  }
}
const edit_compute_model = async () => {
  let result = await axios.post('/backend/calculate_model/edit_calculate_model', form)
  if (result.status == 200) {
    form.model_name = ''
    form.id = ''
    EditDialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
  }
}

const loadTableData = async () => {
  let result = await axios.get('/backend/calculate_model/calculate_model')
  if (result.status == 200) {
    tableData.value = result.data.calculate_model
  }
  // console.log(tableData.value)
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