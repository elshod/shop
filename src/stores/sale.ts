import type { Sale } from "@/models/types";
import { defineStore } from "pinia";
import {ref} from 'vue'
import axios from "axios";
import cookies from 'vue-cookies'
import { url } from './vars'
import { ElMessage } from 'element-plus'

export const saleStore = defineStore('sales',()=>{

    const sales = ref<Sale[]>([])
    const cart = ref<Sale[]>([])
    const salesCount = ref<number>(0)
    const slug = ref<string>('sales')

    const all_sales = async (page:number) => {
        axios.get(`${url}/${slug.value}?_page=${page}&_sort=id&_order=desc`)
        .then(async res => {
            salesCount.value = +res.headers['x-total-count']

            sales.value = await Promise.all(res.data.map(async (sale: Sale) => {                
                let result = await axios.get(`${url}/products/${sale.product}`)
                if (result.status == 200){
                    
                    
                    sale.info = {...result.data}
                }
                sale.summa = sale.quantity * sale.info.price

                return sale
            }))

            console.log(sales.value);
            

        })
    }

    const add_to_cart = (payload: Sale) => {

        let check = cart.value.findIndex(item => item.product === payload.product)

        if (check !== -1){
            cart.value[check].quantity += payload.quantity
        } else {
            cart.value = [payload,...cart.value]
        }

        ElMessage({
            type:'success',
            message:'Korzinkaga mahsulot qo`shildi'
        })
        console.log(cart.value)
        cookies.set('cart',cart.value)
    }

    const save_cart = async (payload: Sale[]) => {
        console.log(payload)
        
        await Promise.all(payload.map(async (item: Sale) => {
            await axios.post(`${url}/${slug.value}`,{
                product: item.product,
                date: item.date,
                quantity: item.quantity
            })
            await axios.put(`${url}/products/${item.info.id}`,
            {
                ...item.info,
                quantity: item.info.quantity - item.quantity
            })
        }))
        clear_cart()
    }

    const clear_cart = () => {
        cart.value = []
        cookies.remove('cart')
    }

    return {
        sales,
        cart,
        salesCount,

        clear_cart,
        all_sales,
        save_cart,
        add_to_cart
    }
})