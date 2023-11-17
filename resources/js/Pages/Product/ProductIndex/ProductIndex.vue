<script setup>
// import {computed} from 'vue';
// import {EditOutlined, DeleteOutlined, ReloadOutlined} from '@ant-design/icons-vue';
// import {Link} from '@inertiajs/vue3';
import useProductIndexController from "@/Pages/Product/ProductIndex/ProductIndexController.js";
import DashboardLayout from "@/Layouts/DefaultLayout.vue";

const {loading, search, handleSearch, handleDelete} = useProductIndexController()

const props = defineProps({
    products: {
        type: Object,
        default: () => ({}),
    },
})

console.log(props)
</script>

<template>
    <DashboardLayout>
        <div>
            <a-card :bordered="false" class="rounded">
                <a-row :gutter="16" class="mb-6">
                    <a-col :span="12">
                        <a-space>
                            <a-input
                                v-model:value="search"
                                @change="handleSearch"
                                placeholder="Search..."
                            >
                            </a-input>
                        </a-space>
                    </a-col>
                    <a-col :span="12" class="text-right">
                        <Link :href="route('products.create')">
                            <a-button type="primary">Create New</a-button>
                        </Link>
                    </a-col>
                </a-row>

                <a-row class="mt-4 float-right">
                    Pagination
                </a-row>
            </a-card>
        </div>
    </DashboardLayout>
</template>

