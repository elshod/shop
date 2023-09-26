<template>
    <el-table :data="data" style="width: 100%">
        <el-table-column type="index"/>
        <el-table-column prop="info.title" label="Mahsulot" width="180" />
        <el-table-column prop="info.price" label="Narhi" width="180" >
            <template #default="scope">
                <div>
                    
                    {{ parseInt(scope.row.info?.price).toLocaleString() }} so'm
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="quantity" label="Soni" width="180" />
        <el-table-column prop="quantity" label="Summa" width="180" >
            <template #default="scope">
                <div>
                    {{ scope.row.summa.toLocaleString() }} so'm
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="Sana">
            <template #default="scope">
                <div>
                    {{ new Date(scope.row.date).toLocaleString() }}
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup lang="ts">
defineProps(['data'])


</script>
<style lang="">
    
</style>