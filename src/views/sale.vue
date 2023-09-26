<template>
    <h1>Hisobot</h1>
    <chart :labels="productLabel" :data="productCount"/>
    <el-divider/>

    <sales-table :data="sales"/>


    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        :page-size="10"
        :total="salesCount"
        @current-change="handleCurrentChange"
    />
</template>
<script setup lang="ts">
import salesTable from '@/components/sales/sales-table.vue';
import chart from '@/components/sales/chart.vue';
import {onMounted, ref} from 'vue'
import { saleStore } from '@/stores/sale';
import { storeToRefs } from 'pinia';

const page = ref<number>(0)
const store = saleStore()

const {sales, salesCount} = storeToRefs(store)

const handleCurrentChange = (val:number) => {
    page.value = val
    store.all_sales(page.value)
}

const colors = ref<string[]>([])




import { productStore } from '@/stores/product';

const produtsStore = productStore()

const {productLabel,productCount} = storeToRefs(produtsStore)

onMounted(() => {
    store.all_sales(page.value)
    produtsStore.all_products_nolimit()
})

</script>
<style lang="">
    
</style>