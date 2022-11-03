// 这个模块。API进行统一管理接口
import requests from './requests.js'

// 箭头函数不加{}则代表默认 return 后面整个内容，这个地方相当于 { return requests({....})}
export const getCalculateModel = () =>
    requests({
        url: `/backend/calculate_model/calculate_model`, method: 'GET',
    }).then((response) => {
        // console.log('response', response)
        return response
    }).catch(err => {
        console.log(err)
    })

export const getSubstanceList = (id) =>
    requests({
        url: `/backend/Substance/search_substance?id=${id}`, method: 'GET'
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })

export const getCategoryList = (id) =>
    requests({
        url: `/backend/category/search_category?id=${id}`, method: 'GET',
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })

export const getPropertyList = (id) =>
    requests({
        url: `/backend/property/search_property?id=${id}`, method: 'GET',
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })

// 计算饱和蒸汽压
export const getSaturatedVaporPressure = (data) =>
    requests({
        url: `/QsprOrganicMatter/SaturatedVaporPressure`,
        method: 'POST',
        data
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })

// 计算临界温度，体积，压力 PVT
export const getPVT = (data,compute_property) =>
    requests({
        url: `/GcOrganicMatter/PVT?compute_property=${compute_property}`,
        method: 'POST',
        data
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })

// 计算环糊精α和β
export const getCyclodextrin = (compute_model,data) =>
    requests({
        url:`/Cyclodextrin/Cyclodextrin?compute_model=${compute_model}`,
        method: 'POST',
        data
    }).then((response) => {
        return response
    }).catch(err => {
        console.log(err)
    })
