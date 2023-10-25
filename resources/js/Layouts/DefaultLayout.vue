<script setup>
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import Navigation from "@/Layouts/Partials/Navigation.vue";
import {ref} from "vue";

const parentState = ref(false);

</script>

<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar/>

        <div class="flex flex-col flex-1 w-full">
            <Navigation />

            <div class="p-6 dark:text-white">
                <div v-if="parentState">Dropdown Content</div>
                <slot/>
            </div>
        </div>
    </div>
</template>

