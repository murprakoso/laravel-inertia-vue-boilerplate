<script setup>
import {Head, router, useForm, Link} from '@inertiajs/vue3';
import DashboardLayout from "@/Layouts/DefaultLayout.vue";
import {DeleteFilled, EditFilled} from '@ant-design/icons-vue';
import {h} from 'vue';
import {computed} from 'vue';
import {usePagination} from 'vue-request';
import axios from 'axios';

const title = 'Users'
const props = defineProps({
  status: {
    type: String,
  },
  users: {
    type: Object,
  },
});
// const searchInput = ref(null)

/**
 * Search
 */
const form = useForm({
  search: '',
});
const handleSearch = (event) => {
  console.log(form.search)
  // form.get(route('users.index'), {
  //   preserveScroll: true,
  //   onSuccess: () => form.search
  // });
}

/**
 * Table Handle
 */
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const queryData = async (params) => {
  // const response = await axios.get('https://randomuser.me/api?noinfo', {
  //   params,
  // });
  const response = await axios.get(route('users.index'));
  console.log(response.data.users)
  return response.data.results;
  // console.log('test: ', params);

  // try {
  //   const response = await axios.get('https://randomuser.me/api?noinfo', {
  //     params,
  //   });
  //   console.log(response)
  //   return response.data.results;
  //
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return [];
  // }
};

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));
const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};
// console.log('src: ', dataSource)
</script>

<template>
  <Head :title="title"/>

  <DashboardLayout>
    <template #header>
      {{ title }}
    </template>

    <a-card :bordered="false" class="rounded">
      <a-row :gutter="16" class="mb-6">
        <a-col :span="12">
          <a-input
              v-model:value.lazy="form.search"
              @input="handleSearch"
              placeholder="Search..."
          />
        </a-col>
        <a-col :span="12" class="text-right">
          <Link :href="route('users.create')">
            <a-button type="primary">Create New</a-button>
          </Link>
        </a-col>
      </a-row>

      <a-row>
        <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
          </template>
        </a-table>
      </a-row>
    </a-card>
  </DashboardLayout>
</template>
