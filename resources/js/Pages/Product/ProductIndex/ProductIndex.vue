<script setup>
import {reactive, watch} from 'vue';
import axios from 'axios';
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {ReloadOutlined} from "@ant-design/icons-vue";
import {debounce} from "lodash";
import {useQuery} from 'vue-query';

const queryParams = reactive({
  page: 1,
  results: 10,
  search: '',
  // sortField: 'name',
  // sortOrder: 'DESC',
});

const handleTableChange = (newPagination, filter, sorter) => {
  queryParams.page = newPagination.current;
  queryParams.results = newPagination.pageSize;
  queryParams.sortField = sorter.field;
  queryParams.sortOrder = sorter.order === 'ascend' ? 'ASC' : 'DESC';
  console.log('sorter', sorter)
};

const handleSearch = debounce((value) => {
  queryParams.page = 1;
  queryParams.search = value.target._value;
  console.log('queryParams', queryParams)
}, 500);

const {data: dataSource, refetch, isFetching} = useQuery(['products', queryParams], async () => {
  const res = await axios.get('api/products', {
    params: queryParams
  });
  return res.data;
});

watch(queryParams, () => {
  return refetch
})

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
          <a-button type="primary" class="ml-2" @click="refetch">
            <ReloadOutlined :spin="isFetching"/>
          </a-button>
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
          :loading="isFetching"
          @change="handleTableChange"
      >
        <template #bodyCell="{text, record, index, column}">
          <template v-if="column.dataIndex === 'name'">{{ text }}</template>
        </template>
      </a-table>
    </a-card>
  </DefaultLayout>
</template>
