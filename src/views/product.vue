<template>
    <div class="about">
      <h1>Mahsulot turkumlari</h1>
      <download-excel 
      :data="products"
      :fields="fields"
      >
        Download Data
      </download-excel>
      <el-row :gutter="30">
        <el-col :span="8">
          <productForm @edit="handleEdit" :id="id"/>
        </el-col>
        <el-col :span="16">
          <ProductTable @edit="handleEdit"/>
        </el-col>
      </el-row>
    </div>
  </template>
    
  <script setup lang="ts">
  import  type { Category, ProductParam} from '@/models/types'
  import productForm from '@/components/product/product-form.vue';
  import ProductTable from '@/components/product/product-table.vue';
  import { productStore } from '@/stores/product';
  import { categoryStore } from '@/stores/category';
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  const store = productStore()
  const catStore = categoryStore()
  const {categories} = storeToRefs(catStore)
  const {products} = storeToRefs(store)

  const id = ref<number>(0)
  
  const fields = ref(
    {
      "Mahsulot nomi": "title",
      "Turkum": {
        field: 'category',
        callback: (id: number) => {
          return getCategory(id)
        }
      },
      "Narhi": {
        field:'price',
        callback: (price: number) => {
          return `${price.toLocaleString()} so'm`
        }
      },
      "Soni": {
        field:'quantity',
        callback: (quantity: number) => {
          return `${quantity.toLocaleString()} ta`
        }
      },
      "Xarakteristika": {
        field: 'params',
        callback: (params: []) => {
          let str = ''
          params.forEach((param: ProductParam) => {
            str += `${param.title} - ${param.value}\n`
          })

          return str
        }
      },
      "Holati":{
        field: "status",
          callback: (value: boolean) => {
          return `${value ? 'Faol' : 'Nofaol'}`;
        },
      }
    }
  )

  const getCategory = (id: number): string => {
    let res = categories.value.find((category: Category)=> category.id === id)
    return res?.title || 'topilmadi'
  }

  const handleEdit = (val: number) => {
    id.value = val
  }
  onMounted(() => {
    catStore.all_category()
    store.all_product()
  })
  
  
  </script>
    
  <style></style>
    