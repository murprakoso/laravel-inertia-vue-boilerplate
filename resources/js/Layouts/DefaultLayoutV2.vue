<script setup>
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import Navigation from "@/Layouts/Partials/Navigation.vue";
</script>

<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar/>

        <div class="flex flex-col flex-1 w-full">
            <Navigation>
                <template #header>
                    <slot name="header"/>
                </template>
            </Navigation>

            <div class="p-6 dark:text-white">
                <slot/>
            </div>
        </div>
    </div>
</template>

