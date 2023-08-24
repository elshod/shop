<template>
    <div>
        <el-form 
            ref="paramForm"
            :model="param"
            status-icon
            label-position="top"
            :rules="rules">
            <h4>Yangi xarakteristika</h4>
            <el-form-item label="Xarakteristika nomi" prop="title">
                <el-input v-model="param.title"/>
            </el-form-item>
            <el-form-item label="Turkum" prop="category">
              <el-select 
                v-model="param.category" 
                filterable placeholder="Ro'yhatdan tanlang">
                <el-option
                  v-for="item in catList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Holat" prop="status">
                <el-switch
                    v-model="param.status"
                    size="large"
                    active-text="Faol"
                    inactive-text="Nofaol"
                />
            </el-form-item>
            <el-button type="primary" @click="submitForm(paramForm)">
                Saqlash
            </el-button>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import type { Param, Category } from '@/models/types';
import type { FormInstance, FormRules } from 'element-plus'
import {ref, computed, watch} from 'vue'
const props = defineProps(['id'])
const emit = defineEmits(['edit'])

import { paramStore } from '@/stores/param';
const store = paramStore()
const {add_param, save_param, get_param} = store



import { categoryStore } from '@/stores/category';
const catStore = categoryStore()


const catList = computed(() => catStore.categories.filter((category: Category) => category.status))


const paramForm = ref<FormInstance>()


const param = ref<Param>({
    title: '',
    category: '',
    status: true
})
const toggle = ref<boolean>(false)
const ruleForm = ref({
    title: '',
    category:'',
})

const rules = ref<FormRules<typeof ruleForm>>({
  title: [{ message:'Xarakteristika nomini kiriting', trigger: 'blur', required: true }],
  category: [{ message:'Xarakteristika turkumini belgilang', trigger: 'change', required: true }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (toggle.value){
        save_param(param.value)
        emit('edit',0)
      } else {
        add_param(param.value)
      }
      param.value = {
          title:'',
          status:true,
          category: ''
      }
      toggle.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(() => props.id, async (val:number) => {
  if (val === 0) return 
  let result = await get_param(val)
  if (result.status === 200){
    param.value = {...result.data}
    toggle.value = true
  }
})



</script>
<style lang="">
    
</style>