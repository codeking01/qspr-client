<template>
  <SaturatedVaporPressure v-show="isShow('饱和蒸汽压')"/>
  <Tc v-show="isShow('临界温度（Tc）')"/>
  <Pc v-show="isShow('临界压力（Pc）')"/>
  <Vc v-show="isShow('临界体积（Vc）')"/>
</template>

<script setup>
import SaturatedVaporPressure from "@/views/GeneralOrganics/SaturatedVaporPressure.vue"
import Tc from "@/views/GeneralOrganics/Tc.vue"
import Pc from "@/views/GeneralOrganics/Pc.vue"
import Vc from "@/views/GeneralOrganics/Vc.vue"
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