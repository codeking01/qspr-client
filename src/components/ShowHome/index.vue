<template>
  <div class="form_table">
    <el-card class="box-card" shadow="always">
<!--      <template #header>-->
<!--        <el-breadcrumb>-->
<!--          功能介绍-->
<!--        </el-breadcrumb>-->
<!--      </template>-->
      <el-form class="home-index" label-width="80px" size="default" label-position="right">
<!--        <el-badge class="introduce">-->
<!--          计算QSPR，GC等多种模型方法，该计算模型的方法非常强大。请注意上传的文件必须是gjf文件或者mol文件-->
<!--        </el-badge>-->
        <el-carousel type="card" indicator-position="outside" :interval="8000" arrow="always" height="600px">
          <el-carousel-item v-for="(c1,index) in imgList" :key="index">
            <img :src="c1.imgUrl" alt="轮播图信息">
          </el-carousel-item>
        </el-carousel>
<!--        <el-image :key="url" :src="url" style="width: 100%" lazy />-->
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
// const url=String(new URL('../../assets/images/bg.jpg',import.meta.url))
const imgList = [
  { imgUrl: String(new URL('../../assets/images/home_01.png',import.meta.url)) },
  { imgUrl: String(new URL('../../assets/images/home_02.png',import.meta.url)) },
  { imgUrl: String(new URL('../../assets/images/home_03.png',import.meta.url)) },
  { imgUrl: String(new URL('../../assets/images/home_04.png',import.meta.url)) },
]
onMounted(() => {
  // console.log('**',url)
})
</script>

<style lang="less" scoped>
.introduce{
  margin-top: 0;
}
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
  margin: 2px 2px;
  //width: 800px;
  height: 624px;
}
</style>