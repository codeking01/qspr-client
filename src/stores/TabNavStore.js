import {defineStore} from 'pinia'
import {getCalculateModel, getCategoryList, getSubstanceList,getPropertyList} from "@/api/index.js";

export const useCalculateModel = defineStore('calculateModelStore', {
    state: () => ({
        calculate_model: {},
        // 物质列表
        substanceList: {},
        // 物质分类列表
        // categoryList: {},
        // 预测属性列表
        // propertyList: {},
        // 三级菜单汇总列表
        typeNavList: {},
    }),
    // 可以支持异步方法
    actions: {
        // 加载计算方法数据
        async loadCalculateModel() {
            this.calculate_model = await getCalculateModel()
        },
        // 获取三级菜单内容
        async loadTypeNavList(id) {
            // 加载物质列表
            this.substanceList = await getSubstanceList(id);
            let typeNavList =this.typeNavList = await getSubstanceList(id);
            // 加载物质分类列表
            for (let substanceIndex in typeNavList.Substance) {
                 let substance_id=typeNavList.Substance[substanceIndex].id
                 this.typeNavList.Substance[substanceIndex].category = await getCategoryList(substance_id);
                 // 第二级菜单，添加property
                 for (let categoryIndex in typeNavList.Substance[substanceIndex].category.category) {
                     let category_id=typeNavList.Substance[substanceIndex].category.category[categoryIndex].id;
                     // console.log('sss',category_id)
                     this.typeNavList.Substance[substanceIndex].category.category[categoryIndex].Property = await getPropertyList(category_id);
                 }
            }
        }
    },
    getters: {}
})