import type { Category } from '@/models/types'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

import { url } from './vars'
import { ElMessage } from 'element-plus'

export const categoryStore = defineStore('categories',()=>{

    const categories = ref<Category[]>([])
    const slug = ref<string>('category')


    const all_category = async (): Promise<void> => {
        let result = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
        
        if (result.status == 200){
            console.log(result.status,result.data)
            categories.value = [...result.data]
        }
    }

    const add_category = async (payload: Category): Promise<void> => {
        console.log(`${url}/${slug.value}`)
        
        let result = await axios.post(`${url}/${slug.value}`,payload)
        if (result.status === 201) {
            categories.value = [result.data,...categories.value]
            ElMessage({
                type:'success',
                message:'Yangi turkum qo`shildi!'
            })
        }
    }

    const remove_category =async (id: number): Promise<void> => {
        let result = await axios.delete(`${url}/${slug.value}/${id}`)
        if (result.status == 200){
            categories.value = categories.value.filter((category: Category) => {
                return category.id !== id
            })
            ElMessage({
                type:'warning',
                message: 'Turkum o`chirildi'
            })
        }
    }

    const toggle_category_status = async (category: Category): Promise<void> => {
        category.status = !category.status
        save_category(category)
    }

    const get_category = async (id: number) => {
        return axios.get(`${url}/${slug.value}/${id}`)
    }


    const save_category = async (category: Category): Promise<void> => {
        let result = await axios.put(`${url}/${slug.value}/${category.id}`,category)
        if (result.status == 200){
            categories.value = categories.value.map((cat:Category) => {
                if (cat.id === category.id) return category
                return cat
            })
            ElMessage({
                type:'success',
                message:'Turkum yangilandi'
            })
        }
    }

    return {
        categories,

        toggle_category_status,
        all_category,
        remove_category,
        add_category,
        get_category,
        save_category
    }

})