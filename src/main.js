import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import {useCalculateModel} from "@/stores/TabNavStore.js";
import axios from "axios";
// 配置全局的地址
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

const app=createApp(App)
// 全局提供axios 使用provide和inject
app.provide("axios", axios)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
