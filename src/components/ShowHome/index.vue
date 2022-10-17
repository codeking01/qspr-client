<template>
  <div class="form_table">
    <el-card class="box-card" shadow="always">
      <template #header>
        <el-breadcrumb>
          功能介绍
        </el-breadcrumb>
      </template>
      <el-form label-width="80px" size="default" label-position="right">
        计算QSPR，GC等多种模型方法，该计算模型的方法非常强大。请注意上传的文件必须是gjf文件或者mol文件
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'

onMounted(() => {
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