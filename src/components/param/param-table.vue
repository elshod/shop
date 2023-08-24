<template>
    <div>
        <h4>Turkumlar ro'yhati</h4>
        <el-table :data="params">
            <el-table-column type="index"/>
            <el-table-column prop="title" label="Nomi" />
            <el-table-column label="Turkum">
                <template #default="list">
                    <div>
                        {{ getCategory(list.row.category) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Holati" width="90">
                <template #default="list">
                    <div>
                        <el-button
                            @click="toggle_param_status(list.row)"
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
                            <el-dropdown-item @click="editParam(list.row.id)">
                                <el-icon>
                                    <edit/>
                                </el-icon>
                                O'zgartirish
                            </el-dropdown-item>
                            <el-dropdown-item @click="removeParam(list.row.id)">
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
import { paramStore } from '@/stores/param'
import { categoryStore } from '@/stores/category'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia';
const store = paramStore()

const emit = defineEmits(['edit'])
const editParam = (id: number) => {
    emit('edit',id)
}


const {remove_param,toggle_param_status} = store
const {params} = storeToRefs(store)

const catStore = categoryStore()

const {categories} = storeToRefs(catStore)

const removeParam = (id: number) => {
    ElMessageBox.confirm(
        'Turkumni o`chirmoqchimisiz? Qaroringiz qat`iymi?',
        'Ogohlantirish',
        {
            confirmButtonText: 'Ha',
            cancelButtonText: 'Yo`q',
            type: 'warning',
        }
    ).then(() => {
        remove_param(id)
    }).catch(() => {})
}

const getCategory = (id: number): string => {
    let res = categories.value.find((category: Category)=> category.id === id)
    return res?.title || 'topilmadi'
}

</script>
<style lang="">
    
</style>