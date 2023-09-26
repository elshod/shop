<template>
    <div>
        <el-dialog
            :model-value="dialogVisible"
            title="Korzinka"
            width="30%"
            :before-close="handleClose"
        >
            <div v-if="list.length > 0">
                <el-table :data="list">
                    <el-table-column label="Mahsulot nomi" prop="info.title"/>
                    <el-table-column label="Soni" prop="quantity" width="80"/>
                    <el-table-column label="Narhi" prop="info.price" width="140">
                        <template #default="scope">
                            <div>
                                {{ parseInt(scope.row.info?.price).toLocaleString() }} so'm
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Umumiy narh" align="right">
                        <template #default="scope"> 
                            <div>
                                <b>{{ (scope.row.quantity * scope.row.info?.price).toLocaleString() }} so'm</b>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-divider/>
                <h3>Umumit summa: <b>{{ summa.toLocaleString() }} so'm</b></h3>
                <el-divider/>
    
                <el-button type="warning" @click="clearAll()">Tozalash</el-button>
                <el-popconfirm 
                width="250"
                confirm-button-text="Ha"
                cancel-button-text="Yo`q"
                @confirm="addSale"
                title="Qaroringiz qat`iymi?">
                    <template #reference>
                        <el-button type="success">Buyurtmani saqlash</el-button>
                    </template>
                </el-popconfirm>

            </div>
            <div v-else>
                <h3>Korzinka bo'sh</h3>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import type { Sale } from '@/models/types';
import { productStore } from '@/stores/product';
const productSt = productStore()
import { computed, ref, watch } from 'vue';
import cookies from 'vue-cookies'

const props = defineProps({
    dialogVisible: {type:Boolean, default:false}
})
const emit = defineEmits(['close'])

const toggle = computed(() => props.dialogVisible)
const handleClose = () => {
    emit('close')
}

import {saleStore} from '@/stores/sale'
const store = saleStore()
const addSale = () => {
    store.save_cart(list.value)
    handleClose()
}

const clearAll = () => {
    store.clear_cart()
    handleClose()
}

const list = ref<Sale[]>([])
const summa = ref<number>(0)
watch(()=>props.dialogVisible,async (val) => {    
    if (val) {
        list.value = cookies.get('cart') || []

        if (list.value.length > 0){
            summa.value = 0
            list.value = await Promise.all(list.value.map(async (item:Sale) => {
                if (item.product){
                    let result = await productSt.get_product(item.product)
                    if (result.status == 200) {
                        item.info = result.data
                        summa.value += item.info.price * item.quantity
                    }
                }
                return item
            }))
        }

    }
})




</script>
<style lang="">
    
</style>