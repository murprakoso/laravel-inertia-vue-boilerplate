<script setup>
import {Head, Link} from '@inertiajs/vue3';
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import InputSearch from "@/Components/InputSearch.vue";
import AlertStatus from "@/Components/AlertStatus.vue";
import Table from "@/Pages/User/Component/Table.vue";

const props = defineProps({
    status: {
        type: String,
    },
    users: {
        type: Object,
    },
});

const title = 'Users'
</script>

<template>
    <Head :title="title"/>

    <DefaultLayout>
        <template #header>
            {{ title }}
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <AlertStatus :status="status"/>

                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="text-gray-900 dark:text-gray-100">
                        <div class="rounded-t mb-0 py-3 px-5 border-0">
                            <div class="flex flex-wrap items-center">
                                <div class="relative w-full max-w-full flex-grow flex-1">
                                    <h3 class="font-semibold text-base text-blueGray-700">
                                        {{ title }}
                                    </h3>
                                </div>
                                <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <Link :href="route('users.create')"
                                          class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                        Create
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div class="px-5 pb-3 w-2/4">
                            <InputSearch/>
                        </div>

                        <Table :headers="['name','email']" :users="users.data" :index-number="true"/>

                        <Pagination :pagination="users"/>

                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
