<template>
    <div class="card">
        <img :src="`${product.img.toString()}`"/>
        <div class="title">{{product.title}}</div>
        <div class="category">{{ getCategory(product.category) }}</div>
        <div class="price">{{ product.price.toLocaleString('en-EN') }} so'm</div>
        <div class="btns">
            <el-button @click="changeCount(-1)">
                <el-icon>
                    <minus/>
                </el-icon>
            </el-button>
            {{ count }}
            <el-button @click="changeCount(1)" :disabled="count === product.quantity">
                <el-icon>
                    <plus/>
                </el-icon>
            </el-button>
        </div>
        <el-button 
            :disabled="count === 0"
            @click="add(product.id,count)"
            class="cart"
            type="success">
            <el-icon class="mr-1">
                <shopping-cart/>
            </el-icon>
            Korzinkaga
        </el-button>

    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import type { Product } from '@/models/types';

interface Props {
    product: Product
}

const props = defineProps<Props>()
const count = ref<number>(0)

const changeCount = (val:number): void => {
    if (count.value == 0 && val == -1) return 
    count.value += val
}

import type { Category } from '@/models/types';
import { categoryStore } from '@/stores/category'
const catStore = categoryStore()
const {categories} = storeToRefs(catStore)
const getCategory = (id: number | null): string => {
    let res = categories.value.find((category: Category)=> category.id === id)
    return res?.title || 'topilmadi'
}

import { saleStore } from '@/stores/sale';
const sales = saleStore()

const add = (id: number | undefined,quantity: number) => {
    sales.add_to_cart({
        product: id,
        date: new Date(),
        quantity
    })
    count.value = 0
}

</script>
<style lang="scss">
    @import '@/styles/card.scss';
</style>