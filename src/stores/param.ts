import type { Param } from '@/models/types'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

import { url } from './vars'
import { ElMessage } from 'element-plus'

export const paramStore = defineStore('params',()=>{

    const params = ref<Param[]>([])
    const slug = ref<string>('param')


    const all_param = async (): Promise<void> => {
        let result = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
        
        if (result.status == 200){
            console.log(result.data)
            
            params.value = [...result.data]
        }
    }

    const add_param = async (payload: Param): Promise<void> => {
        
        let result = await axios.post(`${url}/${slug.value}`,payload)
        if (result.status === 201) {
            params.value = [result.data,...params.value]
            ElMessage({
                type:'success',
                message:'Yangi xarakteristika qo`shildi!'
            })
        }
    }

    const remove_param = async (id: number): Promise<void> => {
        let result = await axios.delete(`${url}/${slug.value}/${id}`)
        if (result.status == 200){
            params.value = params.value.filter((param: Param) => {
                return param.id !== id
            })
            ElMessage({
                type:'warning',
                message: 'Xarakteristika o`chirildi'
            })
        }
    }

    const toggle_param_status = async (param: Param): Promise<void> => {
        param.status = !param.status
        save_param(param)
    }

    const get_param = async (id: number) => {
        return axios.get(`${url}/${slug.value}/${id}`)
    }


    const save_param = async (param: Param): Promise<void> => {
        let result = await axios.put(`${url}/${slug.value}/${param.id}`,param)
        if (result.status == 200){
            params.value = params.value.map((cat:Param) => {
                if (cat.id === param.id) return param
                return cat
            })
            ElMessage({
                type:'success',
                message:'Xarakteristika yangilandi'
            })
        }
    }

    const get_params_by_category = async (id: number | null) => {
        return axios.get(`${url}/${slug.value}?category=${id}`)
    }

    return {
        params,

        toggle_param_status,
        all_param,
        remove_param,
        add_param,
        get_param,
        save_param,
        get_params_by_category
    }

})