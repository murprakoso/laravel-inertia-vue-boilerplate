<script setup>
import {Head, Link} from "@inertiajs/vue3";
import {DeleteOutlined, EditOutlined, ReloadOutlined} from "@ant-design/icons-vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import useUserIndexController from "@/Pages/User/UserIndex/UserIndexController.js";
import {h} from "vue";

const {
    userData,
    userDataRefetch,
    userDataIsFetching,
    handleTableChange,
    handleSearch,
    handleDelete,
    UserTableProps,
} = useUserIndexController();

const title = 'Users';

// const handleSearch = () => {
//     console.log('handleSearch')
// }
</script>

<template>
    <Head :title="title"/>
    <DefaultLayout>
        <template #header>
            {{ title }}
        </template>
        <a-card>
            <a-row :gutter="16" class="mb-6">
                <a-col :span="12">
                    <a-space>
                        <a-input
                            @change="handleSearch"
                            placeholder="Search..."
                            :allow-clear="true"
                        >
                        </a-input>
                    </a-space>
                    <a-button type="primary" class="ml-2" @click="userDataRefetch">
                        <ReloadOutlined :spin="userDataIsFetching"/>
                    </a-button>
                </a-col>
                <a-col :span="12" class="text-right">
                    <Link :href="$route('users.create')">
                        <a-button type="primary">Create New</a-button>
                    </Link>
                </a-col>
            </a-row>

            <a-table
                size="small"
                bordered
                :scroll="{ x: 900 }"
                :row-key="record => record.id.toString()"
                :columns="UserTableProps"
                :data-source="userData?.data"
                :pagination="{
                    total: userData?.total,
                    showTotal: total => `Total ${total} items`,
                    size: 'large',
                }"
                :loading="userDataIsFetching"
                @change="handleTableChange"
            >
                <template #bodyCell="{text, record, index, column}">
                    <template v-if="column.dataIndex === 'no'">{{ userData.from + index }}</template>
                    <template v-if="column.dataIndex === 'name'">{{ text }}</template>
                    <template v-if="column.dataIndex === 'actions'">
                        <Link :href="route('users.edit', record.id)">
                            <a-tooltip title="Edit" placement="left">
                                <a-button type="text" :icon="h(EditOutlined)" class="mr-2">
                                </a-button>
                            </a-tooltip>
                        </Link>
                        <a-popconfirm
                            v-if="userData.data.length"
                            placement="left"
                            title="Sure to delete?"
                            @confirm="handleDelete(record)"
                        >
                            <a-tooltip title="Delete" placement="top">
                                <a-button type="text" :icon="h(DeleteOutlined)">
                                </a-button>
                            </a-tooltip>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </a-card>
    </DefaultLayout>
</template>
