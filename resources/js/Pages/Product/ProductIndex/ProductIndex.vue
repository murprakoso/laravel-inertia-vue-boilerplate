<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {DeleteOutlined, EditOutlined, ReloadOutlined} from "@ant-design/icons-vue";
import useProductIndexController from "@/Pages/Product/ProductIndex/ProductIndexController.js";
import {Head, Link, usePage} from "@inertiajs/vue3";
import {h} from "vue";
import useNotification from "@/Shared/Hooks/useNotification.js";

const {
    productData,
    productDataRefetch,
    productDataIsFetching,
    handleTableChange,
    handleSearch,
    handleDelete,
    ProductTableProps,
} = useProductIndexController()

const title = 'Products';
//
// const {openNotification} = useNotification();
// const {status} = usePage().props
//
// console.log('status', status)
// if (status) {
//     console.log('status', status)
//     setTimeout(() => {
//         openNotification({
//             type: status.type,
//             message: status.type,
//             description: `${status.message}`,
//         });
//     }, 1000)
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
                    <a-button type="primary" class="ml-2" @click="productDataRefetch">
                        <ReloadOutlined :spin="productDataIsFetching"/>
                    </a-button>
                </a-col>
                <a-col :span="12" class="text-right">
                    <Link :href="$route('products.create')">
                        <a-button type="primary">Create New</a-button>
                    </Link>
                </a-col>
            </a-row>

            <a-table
                size="small"
                bordered
                :scroll="{ x: 1300 }"
                :row-key="record => record.id.toString()"
                :columns="ProductTableProps"
                :data-source="productData?.data"
                :pagination="{
                    total: productData?.total,
                    showTotal: total => `Total ${total} items`,
                    size: 'large',
                }"
                :loading="productDataIsFetching"
                @change="handleTableChange"
            >
                <template #bodyCell="{text, record, index, column}">
                    <template v-if="column.dataIndex === 'no'">{{ productData.from + index }}</template>
                    <template v-if="column.dataIndex === 'name'">{{ text }}</template>
                    <template v-if="column.dataIndex === 'actions'">
                        <Link :href="route('products.edit', record.id)">
                            <a-tooltip title="Edit" placement="left">
                                <a-button type="text" :icon="h(EditOutlined)" class="mr-2">
                                </a-button>
                            </a-tooltip>
                        </Link>
                        <a-popconfirm
                            v-if="productData.data.length"
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
