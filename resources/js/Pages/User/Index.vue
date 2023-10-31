<script setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import Pagination from "@/Components/Pagination.vue";
import InputSearch from "@/Components/InputSearch.vue";
import AlertStatus from "@/Components/AlertStatus.vue";
import Table from "@/Pages/User/Component/Table.vue";
import DashboardLayout from "@/Layouts/DashboardLayout.vue";

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
    form.get(route('users.index'), {
        preserveScroll: true,
        onSuccess: () => form.search
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
            <p>User</p>
        </a-card>
    </DashboardLayout>
</template>
