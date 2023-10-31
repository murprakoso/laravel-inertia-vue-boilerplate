<script setup>
import {Head} from '@inertiajs/vue3';
import DashboardLayout from "@/Layouts/DefaultLayout.vue";
</script>

<template>
  <Head title="Dashboard"/>

  <DashboardLayout>
    <!--        <template #header>-->
    <!--            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>-->
    <!--        </template>-->
    <template #header>
      Dashboard
    </template>

    <a-card :bordered="false" class="rounded">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </DashboardLayout>
</template>
