<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {ReloadOutlined} from "@ant-design/icons-vue";
import useProductIndexController from "@/Pages/Product/ProductIndex/ProductIndexController.js";

const {
  productData,
  productDataRefetch,
  productDataIsFetching,
  handleTableChange,
  handleSearch,
  ProductTableProps,
} = useProductIndexController()

</script>

<template>
  <DefaultLayout>
    <a-card>
      <a-row :gutter="16" class="mb-6">
        <a-col :span="12">
          <a-space>
            <a-input
                @change="handleSearch"
                placeholder="Search..."
            >
            </a-input>
          </a-space>
          <a-button type="primary" class="ml-2" @click="productDataRefetch">
            <ReloadOutlined :spin="productDataIsFetching"/>
          </a-button>
        </a-col>
        <a-col :span="12" class="text-right">
          <a-button type="primary">Create New</a-button>
        </a-col>
      </a-row>

      <a-table
          size="small"
          bordered
          :columns="ProductTableProps"
          :data-source="productData?.data"
          :pagination="{
            total: productData?.total,
          }"
          :loading="productDataIsFetching"
          @change="handleTableChange"
      >
        <template #bodyCell="{text, record, index, column}">
          <template v-if="column.dataIndex === 'name'">{{ text }}</template>
        </template>
      </a-table>
    </a-card>
  </DefaultLayout>
</template>
