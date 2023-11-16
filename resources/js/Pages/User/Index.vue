<script setup>
import {Head, Link, router, useForm, usePage} from '@inertiajs/vue3';
import DashboardLayout from "@/Layouts/DefaultLayout.vue";
import {ref, h, watch} from 'vue';
import {notification} from 'ant-design-vue';
import {EditOutlined, DeleteOutlined, ReloadOutlined} from "@ant-design/icons-vue";
import {debounce} from "lodash/function.js";


const title = 'Users';
const props = defineProps({
  status: {
    type: String,
  },
  users: {
    type: Object,
    default: () => ({}),
  },
});

/**
 * Ref / Reactive / State
 */
const loading = false
const current = ref(props.users?.current_page);
const pageSize = ref(props.users?.per_page);
const total = ref(props.users?.total)
const searchInput = ref(usePage().props.ziggy?.query?.search || '')

/**
 * Handle Table
 */
const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    align: 'center',
    width: 50,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    width: 160,
  }
]

/**
 * Handle Paginattion
 * @param page
 * @param pageSize
 */
const handlePagination = (page, pageSize) => {
  console.log(searchInput.value)
  const params = (searchInput.value) ? {
    page: page,
    results: pageSize,
    search: searchInput.value
  } : {
    page: page,
    results: pageSize,
  }
  router.get(route('users.index', params));
}
// const handlePagination = async (page, pageSize) => {
//   // Fetch data for the selected page using Inertia's visit method
//   await router.visit(route('users.index', {page: page, results: pageSize, search: searchInput.value}));
//   current.value = page;
//   pageSize.value = pageSize;
// }

/**
 * Handle Search
 * @type {(function(): (*))|*}
 */
const handleSearch = debounce(() => {
  const searchValue = searchInput.value;
  router.get(route('users.index', {search: searchValue}), {
    // preserveState: true,
    // preserveScroll: false,
  });
}, 700);

/**
 * Handle Deelete
 * @param id
 */
const handleDelete = (id) => {
  router.delete(route('users.destroy', id))
  console.log('delete: ', props.status)

  notification.success({
    placement: 'bottomRight',
    message: `${props.status?.type}`,
    description: `${props.status?.message}`,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
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
          <a-space>
            <a-input
                v-model:value="searchInput"
                @change="handleSearch"
                placeholder="Search..."
            >
            </a-input>
            <a-button type="primary" @click="$inertia.reload()">
              <ReloadOutlined/>
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="12" class="text-right">
          <Link :href="route('users.create')">
            <a-button type="primary">Create New</a-button>
          </Link>
        </a-col>
      </a-row>

      <a-row>
        <a-table
            bordered
            size="small"
            :scroll="{ x: 1300 }"
            :columns="columns"
            :dataSource="users.data"
            :pagination="false"
            :loading="loading"
        >
          <template #bodyCell="{ column, text, record, index}">
            <template v-if="column.dataIndex === 'no'">
              {{ index + $props.users.from }}
            </template>
            <template v-if="column.dataIndex === 'actions'">
              <Link :href="route('users.edit', record.id)">
                <a-button type="text" :icon="h(EditOutlined)" class="mr-2">
                </a-button>
              </Link>
              <a-popconfirm
                  v-if="users.data.length"
                  placement="left"
                  title="Sure to delete?"
                  @confirm="handleDelete(record.id)"
              >
                <a-button type="text" :icon="h(DeleteOutlined)">
                </a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-row>
      <a-row class="mt-4 float-right">
        <a-pagination
            show-size-changer
            v-model:current="current"
            v-model:page-size="pageSize"
            :total="$props.users.total" size="small"
            :show-total="total => `Total ${total} items`"
            @change="handlePagination"/>
      </a-row>
    </a-card>
  </DashboardLayout>
</template>

