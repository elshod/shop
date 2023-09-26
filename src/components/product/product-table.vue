<template>
    <div>
        <el-table :data="products">
            <el-table-column type="index"/>
            <el-table-column width="65">
                <template #default="scope">
                    <div>
                        <img :src="scope.row.img" alt="" class="product_img">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="Nomi">
                <template #default="scope">
                    <el-popover
                        placement="top-start"
                        title="Mahsulot xarakteristikasi"
                        :width="300"
                        trigger="contextmenu"
                    >
                        <template #reference>
                            <div>
                                {{ scope.row.title }} <br>
                                <el-tag>{{ getCategory(scope.row.category) }}</el-tag>
                            </div>
                        </template>
                        <el-table :data="scope.row.params">
                            <el-table-column width="150" property="title" label="Nomi" />
                            <el-table-column width="100" property="value" label="Qiymati" />
                        </el-table>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="Narh/Son">
                <template #default="scope">
                    <div>
                        {{ scope.row.price.toLocaleString() }} so'm
                    </div>
                    {{ scope.row.quantity.toLocaleString() }} ta
                </template>
            </el-table-column>
            <el-table-column label="Yaratilgan sana">
                <template #default="scope">
                    <div>
                        {{ convertDate(scope.row.createdAt) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Holati" width="90">
                <template #default="list">
                    <div>
                        <el-button
                            @click="toggle_product_status(list.row)"
                            :type="list.row.status?'success':'warning'">
                            <el-icon>
                                <check v-if="list.row.status"/>
                                <close v-else/>
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="100" align="right">
                <template #default="list">
                    <el-dropdown>
                        <el-button>
                            <el-icon>
                                <more/>
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="editProduct(list.row.id)">
                                <el-icon>
                                    <edit/>
                                </el-icon>
                                O'zgartirish
                            </el-dropdown-item>
                            <el-dropdown-item @click="removeProduct(list.row.id)">
                                <el-icon>
                                    <delete/>
                                </el-icon>
                                O'chirish
                            </el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import  {type Category} from '@/models/types'
import { productStore } from '@/stores/product'
import { ElMessageBox } from 'element-plus'
import {convertDate} from '@/utils/date'

import { storeToRefs } from 'pinia';
const store = productStore()

const emit = defineEmits(['edit'])
const editProduct = (id: number) => {
    emit('edit',id)
}


const {remove_product,toggle_product_status} = store
const {products} = storeToRefs(store)


import { categoryStore } from '@/stores/category'
const catStore = categoryStore()
const {categories} = storeToRefs(catStore)
const getCategory = (id: number): string => {
    let res = categories.value.find((category: Category)=> category.id === id)
    return res?.title || 'topilmadi'
}

const removeProduct = (id: number) => {
    ElMessageBox.confirm(
        'Turkumni o`chirmoqchimisiz? Qaroringiz qat`iymi?',
        'Ogohlantirish',
        {
            confirmButtonText: 'Ha',
            cancelButtonText: 'Yo`q',
            type: 'warning',
        }
    ).then(() => {
        remove_product(id)
    }).catch(() => {})
}



</script>
<style lang="">
    
</style>