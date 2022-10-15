<template>
  <div class="table_data">
    <el-table class="el-card" :data="tableData" style="width: 30% " border>
      <el-table-column label="计算方法" prop="model_name" id="id"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleAdd(scope.$index, scope.row)" style="margin-bottom: 5px">添加物质
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-tabs type="border-card" style="margin-top: 10px">
      <div v-for="(item,index) in tableData">
        <el-tab-pane :label="item.model_name" :key="item.id">
          <!--          {{item.substance}}-->
          <!--            根据id 找到所有对应的物质-->
          <el-table class="el-card" :data="item.substance" style="width: 30%" border>
            <el-table-column label="物质" prop="substance_name" id="id"/>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑
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
        </el-tab-pane>
      </div>
      <!--      {{tableData}}-->
    </el-tabs>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加计算模型">
    <el-form :model="form">
      <el-form-item label="计算方法" :label-width="formLabelWidth">
        <el-input v-model="form.model_name" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="新增物质" :label-width="formLabelWidth">
        <el-input v-model="form.substance_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add_substance">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="EditDialogFormVisible" title="编辑计算模型">
    <el-form :model="edit_form">
      <el-form-item label="物质名字" :label-width="formLabelWidth">
        <el-input v-model="edit_form.substance_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="edit_substance_name">确定</el-button>
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
// 这个是添加的表单数据
const form = reactive({
  id: '',
  model_name: '',
  // 添加物质的名字
  substance_name: ''
})
// 这个是编辑的表单数据
const edit_form = reactive({
  id: '',
  // 修改物质的名字
  substance_name: ''
})

// 从后台读取数据
const tableData = ref([])

// 编辑物质
const handleEdit = async (index, row) => {
  // console.log(row)
  // 弹出编辑对话框
  edit_form.substance_name = row.substance_name;
  edit_form.id = row.id;
  EditDialogFormVisible.value = true;
  // console.log(index, row)
}

const edit_substance_name = async () => {
  let result = await axios.post('/backend/Substance/edit_substance', edit_form)
  if (result.status == 200) {
    edit_form.substance_name = '';
    edit_form.id = '';
    EditDialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadSubstance()
  }
}

const handleDelete = async (index, row) => {
  // console.log('id ', row.id)
  let result = await axios.post('/backend/Substance/del_substance?id=' + row.id)
  if (result.status == 200) {
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadSubstance()
  }
}


const handleAdd = async (index, row) => {
  // console.log('***',row)
  form.model_name = row.model_name;
  form.id = row.id;
  dialogFormVisible.value = true;
}

const add_substance = async () => {
  let result = await axios.post('/backend/Substance/add_substance', form)
  if (result.status == 200) {
    form.model_name = ''
    form.substance_name = ''
    form.id = ''
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadSubstance()
  }
}

const loadTableData = async () => {
  let result = await axios.get('/backend/calculate_model/calculate_model')
  if (result.status == 200) {
    tableData.value = result.data.calculate_model
  }
  // console.log(tableData.value)
}
// 根据不同的id，加载物质
const loadSubstance = async () => {
  // console.log("tablevalue", tableData.value)
  for (let index in tableData.value) {
    // console.log(tableData.value[index].id)
    let compute_model_id = tableData.value[index].id
    let result = await axios.get('/backend/Substance/search_substance?id=' + compute_model_id)
    // console.log('result:',result)
    tableData.value[index].substance = result.data.Substance
  }
  // console.log("tableData.value", tableData.value)
}

onMounted(async () => {
  await loadTableData()
  await loadSubstance()
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