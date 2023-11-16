<script setup>
import {Head, router, useForm} from '@inertiajs/vue3';
import DashboardLayout from "@/Layouts/DefaultLayout.vue";
import {DeleteFilled, EditFilled} from '@ant-design/icons-vue';
import {h} from 'vue';

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

const createNew = () => {
  router.visit(route('users.create'))
}

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 100,
  },
];


import {message} from 'ant-design-vue';

const handleDelete = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const handleEdit = (e) => {
  router.visit('users/edit/' + e)
};
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
          <a-button type="primary" @click="createNew">Create New</a-button>
        </a-col>
      </a-row>

      <a-row>
        <a-table :dataSource="dataSource" :columns="columns" size="small" :scroll="{ x: 1300 }"
                 class="ant-table-striped" bordered>
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
              <a-button :icon="h(EditFilled)" class="mr-2 text-blue-700" @click="handleEdit(record.key)"/>
              <a-popconfirm
                  title="Sure to delete?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="handleDelete(record.key)"
              >
                <a-button :icon="h(DeleteFilled )" class="text-red-600"/>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-row>
    </a-card>
  </DashboardLayout>
</template>
