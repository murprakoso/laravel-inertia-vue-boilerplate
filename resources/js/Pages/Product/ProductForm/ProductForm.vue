<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {Head, Link} from "@inertiajs/vue3";
import {defineProps} from 'vue';
import {ArrowLeftOutlined} from "@ant-design/icons-vue";
import {FormMode} from "@/Shared/Enum/FormType.js";
import useProductFormController from "@/Pages/Product/ProductForm/ProductFormController.js";

const props = defineProps({
    product: {
        type: Object, default: () => ({}),
    },
    formMode: String
})

const {formMode, formState, handleSubmit} = useProductFormController(props);

const title = `${formMode === FormMode.CREATE ? 'Create' : 'Edit'} Product`;

</script>

<template>
    <Head :title="title"/>
    <DefaultLayout>
        <template #header>
            {{ title }}
        </template>

        <a-card>
            <a-row :gutter="20" class="mb-6">
                <a-col :span="12">
                    <a-space>
                        <Link :href="$route('products.index')">
                            <a-button type="default" class="ml-0">
                                <ArrowLeftOutlined/>
                            </a-button>
                        </Link>
                    </a-space>
                </a-col>
                <a-col :span="12" class="text-right">
                    Lorem ipsum dolor sit amet, consectetur.
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="24">
                    <a-form layout="vertical" :model="formState">
                        <a-form-item label="Name">
                            <a-input v-model:value="formState.name" placeholder="Name.."/>
                        </a-form-item>
                        <a-form-item label="Price">
                            <a-input-number v-model:value="formState.price" prefix="Rp" style="width: 100%"
                                            placeholder="Price.."/>
                        </a-form-item>
                        <a-form-item :wrapper-col="{span: 14}">
                            <a-button type="primary" @click="handleSubmit">Submit</a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </a-card>
    </DefaultLayout>

</template>
