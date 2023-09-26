<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import salesCard from '@/components/sales/sales-card.vue';
import cart from '@/components/sales/cart.vue';
import {productStore} from '@/stores/product'
const productsSt = productStore()
const {products} = storeToRefs(productsSt)

import { categoryStore } from '@/stores/category';
const catStore = categoryStore()

const toggle = ref<boolean>(false)

const handleClose = () => {
  toggle.value = false
}

onMounted(() => {
  catStore.all_category()
  productsSt.all_product()
})

</script>

<template>
  <main>
    <div class="head">
      <h1>Sotuv bo`limi</h1>
      <el-button type="primary" @click="toggle = true">Korzinka</el-button>
    </div>
    <cart :dialog-visible="toggle" @close="handleClose"/>
    <el-input placeholder="Qidiruv" class="mb-1"/>
    <el-row :gutter="30">
      <el-col 
        :span="6"
        v-for="product of products"
        :key="product.id"
        >
          <salesCard :product="product" />
      </el-col>
    </el-row>
  </main>
</template>
