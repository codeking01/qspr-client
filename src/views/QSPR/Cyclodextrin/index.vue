<template>
  <CyclodextrinAlpha v-show="isShow('环糊精α结合常数')"/>
  <CyclodextrinBeta v-show="isShow('环糊精β结合常数')"/>
</template>

<script setup>
import CyclodextrinAlpha from "@/views/QSPR/Cyclodextrin/CyclodextrinAlpha.vue"
import CyclodextrinBeta from "@/views/QSPR/Cyclodextrin/CyclodextrinBeta.vue"
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()
let property_name;
property_name = computed(() => {
  return router.currentRoute.value.query.property_name
});
const isShow = (current_property_name) => {
  return property_name.value === current_property_name
}
</script>

<style scoped>

</style>