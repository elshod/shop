<template lang="">
    <div>
        <h4>Turkumlar ro'yhati</h4>
        <el-table :data="categories">
            <el-table-column type="index"/>
            <el-table-column prop="title" label="Nomi" />
            <el-table-column label="Holati" width="90">
                <template #default="list">
                    <div>
                        <el-button
                            @click="toggle_category_status(list.row)"
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
                            <el-dropdown-item @click="editCategory(list.row.id)">
                                <el-icon>
                                    <edit/>
                                </el-icon>
                                O'zgartirish
                            </el-dropdown-item>
                            <el-dropdown-item @click="removeCat(list.row.id)">
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
import { categoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia';
import { ElMessageBox } from 'element-plus'
const emit = defineEmits(['edit'])
const store = categoryStore()

const editCategory = (id: number) => {
    emit('edit',id)
}

const removeCat = (id: number) => {
    ElMessageBox.confirm(
        'Turkumni o`chirmoqchimisiz? Qaroringiz qat`iymi?',
        'Ogohlantirish',
        {
            confirmButtonText: 'Ha',
            cancelButtonText: 'Yo`q',
            type: 'warning',
        }
    ).then(() => {
        remove_category(id)
    }).catch(() => {})
}

const {remove_category,toggle_category_status} = store
const {categories} = storeToRefs(store)

</script>
<style lang="">
    
</style>