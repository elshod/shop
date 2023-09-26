<template>
    <div class="about">
      <div class="head">
        <div class="df align-items-center">
          <h1>Mahsulotlar</h1>
          <button class="add" @click="toggle = true">
            <el-icon><plus/></el-icon>
          </button>
        </div>
        <download-excel 
        :data="products"
        :fields="fields"
        >
          <el-button type="primary">
            Excel
          </el-button>
        </download-excel>
      </div>
      <productStatis :params="{
        summa
      }"/>

      <div class="content">
        <productForm 
          @edit="handleEdit" 
          :id="id" 
          :drawerToggle="toggle" 
          @close="handleClose"
          />
        <ProductTable @edit="handleEdit"/>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import  type { Category, ProductParam} from '@/models/types'
  import productForm from '@/components/product/product-form.vue';
  import ProductTable from '@/components/product/product-table.vue';
  import ProductStatis from '@/components/product/product-statis.vue';
  import { productStore } from '@/stores/product';
  import { categoryStore } from '@/stores/category';
  import { onMounted, ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';

  const store = productStore()
  const catStore = categoryStore()
  const {categories} = storeToRefs(catStore)
  const {products} = storeToRefs(store)

  const id = ref<number>(0)
  const toggle = ref<boolean>(false)

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
  
    const summa = computed(() => {
      let s = 0 
      products.value.forEach(product => {
        s += product.quantity * product.price
      })
      return s
    })

  const getCategory = (id: number): string => {
    let res = categories.value.find((category: Category)=> category.id === id)
    return res?.title || 'topilmadi'
  }

  const handleEdit = (val: number) => {
    id.value = val
    toggle.value = true
  }

  const handleClose = () => {
    toggle.value = false
  }

  onMounted(() => {
    catStore.all_category()
    store.all_product()
  })
  
  
  </script>
    
  <style></style>
    