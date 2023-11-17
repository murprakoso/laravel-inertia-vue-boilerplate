<script setup>
import {computed, ref} from 'vue';
import {usePagination} from 'vue-request';
import axios from 'axios';
import DefaultLayout from "@/Layouts/DefaultLayout.vue";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    width: '50%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    width: '50%',
  },
];

const queryData = async (params) => {
  const sortOrder = params.sortOrder === 'ascend' ? 'ASC' : 'DESC';
  const modifiedParams = {
    ...params,
    sortOrder: sortOrder,
    search: 're'
  };

  console.log('params', modifiedParams)
  try {
    const res = await axios.get('api/products', {
      // ...params,
      // sortOrder: sortOrder,
      params: modifiedParams
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
  total,
} = usePagination(queryData
    // {
    // formatResult: res => res.data,
    // pagination: {
    // currentKey: 'page',
    // pageSizeKey: 'results',
    // totalKey: 'total',
    // currentKey: 'page',
    // pageSizeKey: 'results',
    // totalKey: 'total',
    // },
// }
);

// const pagination = computed(() => ({
//   total: total.value,
//   current: current.value,
//   pageSize: pageSize.value,
// }));

const handleTableChange = (pag, filters, sorter) => {
  console.log('pag', pag)
  run({
    results: pag.pageSize,
    page: pag?.current,
    total: pag?.total,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

const handleSearch = (e) => {
  run({
    search: e.target.value,
  });
};

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
        </a-col>
        <a-col :span="12" class="text-right">
          <a-button type="primary">Create New</a-button>
        </a-col>
      </a-row>

      <a-table
          size="small"
          bordered
          :columns="columns"
          :data-source="dataSource?.data"
          :pagination="{
            total: dataSource?.total,
          }"
          :loading="loading"
          @change="handleTableChange"
      >
        <template #bodyCell="{text, record, index, column}">
          <template v-if="column.dataIndex === 'name'">{{ text }}</template>
        </template>
      </a-table>
    </a-card>
  </DefaultLayout>
</template>
