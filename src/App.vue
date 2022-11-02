<template>
  <div class="app">
    <!--    <router-view/>-->
    <HomePage v-if="!isShow('backend')"/>

    <router-view v-if="isShow('backend')"/>
  </div>

</template>

<script setup>
import HomePage from "@/views/HomePage.vue";
import {useRouter} from "vue-router";
import {computed} from "vue";
const router = useRouter()
let backendRouter;
backendRouter = computed(() => {
  return router.currentRoute.value.path.split('/')[1]
});
const isShow = (backend) => {
  return backendRouter.value === backend
}

console.log()
</script>

<style scoped>
/*.app{*/
/*  background-image: url('@/assets/images/bg.jpg');*/
/*}*/
</style>
