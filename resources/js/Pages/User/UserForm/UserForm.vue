<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {Head, Link} from "@inertiajs/vue3";
import {defineProps} from "vue";
import {ArrowLeftOutlined} from "@ant-design/icons-vue";
import useUserFormController from "@/Pages/User/UserForm/UserFormController.js";
import {FormMode} from "@/Shared/Enum/FormType.js";

const props = defineProps({
    user: {type: Object, default: () => ({})},
    formMode: String,
})

const {formMode, formState, handleSubmit, validateInfos} = useUserFormController(props);

const title = `${formMode === FormMode.CREATE ? 'Create' : 'Edit'} User`;
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
                        <Link :href="$route('users.index')">
                            <a-button type="default" class="ml-1">
                                <ArrowLeftOutlined/>
                            </a-button>
                        </Link>
                    </a-space>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="24">
                    <a-form layout="vertical" :model="formState">
                        <a-form-item label="Name" required v-bind="validateInfos.name">
                            <a-input v-model:value="formState.name" placeholder="Name.."/>
                        </a-form-item>
                        <a-form-item label="Email" name="email" required v-bind="validateInfos.email">
                            <a-input v-model:value="formState.email"
                                     placeholder="Email.."/>
                        </a-form-item>
                        <a-form-item label="Password" required v-bind="validateInfos.password">
                            <a-input-password v-model:value="formState.password" name="password"
                                              placeholder="Password.."/>
                        </a-form-item>
                        <a-form-item label="Password Confirmation" name="password_confirmation" required
                                     v-bind="validateInfos.password_confirmation">
                            <a-input-password v-model:value="formState.password_confirmation"
                                              placeholder="Password Confirmation.."/>
                        </a-form-item>
                        <a-form-item :wrapper-col="{span: 13}" class="pt-4">
                            <a-button type="primary" @click="handleSubmit">Submit</a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </a-card>
    </DefaultLayout>
</template>
