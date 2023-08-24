<template>
  <div class="about">
    <h1>Mahsulot turkumlari</h1>
    <el-row :gutter="30">
      <el-col :span="8">
        <categoryForm :id="id" @edit="handleEdit"/>
      </el-col>
      <el-col :span="16">
        <CategoryTable @edit="handleEdit"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import categoryForm from '@/components/category/category-form.vue';
import CategoryTable from '@/components/category/category-table.vue';
import { categoryStore } from '@/stores/category';

const id = ref<number>(0)

const handleEdit = (val: number) => {  
  id.value = val
}

import { onMounted } from 'vue';

const store = categoryStore()

onMounted(()=>{
  store.all_category()
})

</script>

<style>

</style>
