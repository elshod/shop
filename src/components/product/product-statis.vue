<template>
    <el-row :gutter="30">
        <el-col :span="12">
            <el-statistic :value="`${params.summa.toLocaleString()} so'm`">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                    Umumiy mahsulotlar narhi
                    <el-tooltip
                        effect="dark"
                        content="Number of users who logged into the product in one day"
                        placement="top"
                    >
                        <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                        </el-icon>
                    </el-tooltip>
                    </div>
                </template>
                </el-statistic>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
const props = defineProps(['params'])
</script>
<style lang="">
    
</style>