import type { Product, Sale } from '@/models/types'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

import { url } from './vars'
import { ElMessage } from 'element-plus'

export const productStore = defineStore('products',()=>{

    const products = ref<Product[]>([])
    const slug = ref<string>('products')
    const productLabel = ref<string[]>([])
    const productCount = ref<number[]>([])

    const all_product = async (): Promise<void> => {
        let result = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc&_limit=10`)
        
        if (result.status == 200){
            products.value = [...result.data]
        }
    }

    const all_products_nolimit = async () => {
        let result = await axios.get(`${url}/${slug.value}`)
        if (result.status == 200){
            productLabel.value = result.data.map((item: Product) => item.title)
            
            productCount.value = await Promise.all(result.data.map(async (item: Product) => {
                let count = 0
                let res = await axios.get(`${url}/sales?product=${item.id}`)
                if (res.status == 200){
                    res.data.forEach((el:Sale) => {
                        count += el.quantity
                    })
                }
                return count
            }))
            
        }
    }



    const add_product = async (payload: Product): Promise<void> => {
        
        let result = await axios.post(`${url}/${slug.value}`,payload)
        if (result.status === 201) {
            products.value = [result.data,...products.value]
            ElMessage({
                type:'success',
                message:'Yangi mahsulot qo`shildi!'
            })
        }
    }

    const remove_product =async (id: number): Promise<void> => {
        let result = await axios.delete(`${url}/${slug.value}/${id}`)
        if (result.status == 200){
            products.value = products.value.filter((product: Product) => {
                return product.id !== id
            })
            ElMessage({
                type:'warning',
                message: 'Mahsulot o`chirildi'
            })
        }
    }

    const toggle_product_status = async (product: Product): Promise<void> => {
        product.status = !product.status
        save_product(product)
    }

    const get_product = async (id: number) => {
        return axios.get(`${url}/${slug.value}/${id}`)
    }


    const save_product = async (product: Product): Promise<void> => {
        let result = await axios.put(`${url}/${slug.value}/${product.id}`,product)
        if (result.status == 200){
            products.value = products.value.map((cat:Product) => {
                if (cat.id === product.id) return product
                return cat
            })
            ElMessage({
                type:'success',
                message:'Mahsulot yangilandi'
            })
        }
    }

    return {
        products,
        productLabel,
        productCount,
        
        all_products_nolimit,
        toggle_product_status,
        all_product,
        remove_product,
        add_product,
        get_product,
        save_product
    }

})