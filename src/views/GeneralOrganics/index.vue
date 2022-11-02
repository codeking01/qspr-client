<template>
  <SaturatedVaporPressure v-show="isShow('饱和蒸汽压')"/>
</template>

<script setup>
import SaturatedVaporPressure from "@/views/GeneralOrganics/SaturatedVaporPressure.vue"
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