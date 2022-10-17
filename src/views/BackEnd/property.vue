<template>
  <div class="table_data">
    <el-tabs type="border-card" style="margin-top: 10px">
      <div v-for="(item,index) in tableData">
        <!-- 计算模型这一层  -->
        <el-tab-pane :label="item.model_name" :key="item.id">
          <el-tabs el-tabs type="border-card">
            <div v-for="(substance_item,index) in item.substance">
              <!-- 物质分类这一层 -->
              <!--              {{ substance_item }}-->
              <el-tab-pane :label="substance_item.substance_name">
                <el-table class="el-card" :data="substance_item.category" style="width: 50%" border>
                  <el-table-column label="分类" prop="category_name" id="id"/>
                  <el-table-column label="操作" align="center">
                    <template #default="scope">
                      <el-button size="small" type="success" @click="AddProperty(scope.$index, scope.row)">
                        添加预测属性
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </div>
          </el-tabs>
        </el-tab-pane>
      </div>
    </el-tabs>
  </div>
  <div class="table_data">
    <el-tabs type="border-card" style="margin-top: 10px">
      <div v-for="(item,index) in tableData">
        <!-- 计算模型这一层  -->
        <el-tab-pane :label="item.model_name" :key="item.id">
          <el-tabs el-tabs type="border-card">
            <div v-for="(substance_item,index) in item.substance">
              <el-tab-pane :label="substance_item.substance_name">
                <el-tabs el-tabs type="border-card">
                  <div v-for="(Property_item,index) in substance_item.category">
                    <el-tab-pane :label="Property_item.category_name">
                      <el-table class="el-card" :data="Property_item.Property" style="width: 50%" border>
                        <el-table-column label="预测属性" prop="property_name" id="id"/>
                        <el-table-column label="计算属性" prop="compute_name" id="id"/>
                        <el-table-column label="操作" align="center">
                          <template #default="scope">
                            <el-button size="small" type="success" @click="handlePropertyEdit(scope.$index, scope.row)">
                              编辑
                            </el-button>
                            <el-popconfirm title="确定删除？" confirmButtonText="确定"
                                           cancelButtonText="取消"
                                           icon="el-icon-info"
                                           iconColor="red"
                                           @confirm="handlePropertyDelete(scope.$index, scope.row)"
                            >
                              <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                              </template>
                            </el-popconfirm>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </div>
                </el-tabs>
              </el-tab-pane>
            </div>
          </el-tabs>
        </el-tab-pane>
      </div>
    </el-tabs>
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加物质分类">
    <el-form :model="form">
      <el-form-item label="物质分类名字" :label-width="formLabelWidth">
        <el-input v-model="form.category_name" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="新增预测属性" :label-width="formLabelWidth">
        <el-input v-model="form.property_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="新增计算属性" :label-width="formLabelWidth">
        <el-input v-model="form.compute_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add_property">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="EditDialogFormVisible" title="编辑物质分类">
    <el-form :model="edit_form">
      <el-form-item label="预测属性" :label-width="formLabelWidth">
        <el-input v-model="edit_form.property_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="计算属性" :label-width="formLabelWidth">
        <el-input v-model="edit_form.compute_name" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="edit_property">确定</el-button>
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
  substance_name: '',
  // 添加物质分类的名字
  category_name: '',
  // 新增属性名字
  property_name: '',
  // 新增计算属性
  compute_name: ''
})
// 这个是编辑的表单数据
const edit_form = reactive({
  id: '',
  // 修改物质的名字
  // category_name: '',
  // 预测属性名字
  property_name: '',
  // 计算属性名字
  compute_name: '',
})

// 从后台读取数据
const tableData = ref([])

// 编辑物质
const handlePropertyEdit = async (index, row) => {
  // console.log(row)
  // 弹出编辑对话框
  edit_form.property_name = row.property_name;
  edit_form.compute_name = row.compute_name;
  edit_form.id = row.id;
  EditDialogFormVisible.value = true;
  // console.log(index, row)
}


const edit_property = async () => {
  let result = await axios.post('/backend/property/edit_property', edit_form)
  if (result.status == 200) {
    edit_form.property_name = '';
    edit_form.compute_name = '';
    edit_form.id = '';
    EditDialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadProperty()
  }
}

const handlePropertyDelete = async (index, row) => {
  // console.log('id ', row.id)
  let result = await axios.post('/backend/property/del_property?id=' + row.id)
  if (result.status == 200) {
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadProperty()
  }
}


const AddProperty = async (index, row) => {
  // console.log('***', row)
  form.category_name = row.category_name;
  form.id = row.id;
  dialogFormVisible.value = true;
}

const add_property = async () => {
  console.log('ss')
  let result = await axios.post('/backend/property/add_property', form)
  if (result.status == 200) {
    form.property_name = ''
    form.compute_name = ''
    form.id = ''
    dialogFormVisible.value = false;
    success_tip(result.data.msg);
    await loadTableData()
    await loadProperty()
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
const loadProperty = async () => {
  // console.log("tablevalue", tableData.value)
  // 物质
  for (let index in tableData.value) {
    // console.log(tableData.value[index].id)
    let compute_model_id = tableData.value[index].id
    let result = await axios.get('/backend/Substance/search_substance?id=' + compute_model_id)
    // console.log('result:',result)
    tableData.value[index].substance = result.data.Substance
    // 物质分类
    for (let substance_index in tableData.value[index].substance) {
      let substance_id = tableData.value[index].substance[substance_index].id
      let category_result = await axios.get('/backend/category/search_category?id=' + substance_id)
      tableData.value[index].substance[substance_index].category = category_result.data.category
      // 最后一层 预测属性
      for (let category_index in tableData.value[index].substance[substance_index].category) {
        let category_id = tableData.value[index].substance[substance_index].category[category_index].id
        // console.log('*****',category_id)
        let property_result = await axios.get('/backend/property/search_property?id=' + category_id)
        // console.log('property_result',property_result)
        tableData.value[index].substance[substance_index].category[category_index].Property = property_result.data.Property
      }
    }
  }
  // console.log("tableData.value", tableData.value)
}

onMounted(async () => {
  await loadTableData()
  await loadProperty()
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