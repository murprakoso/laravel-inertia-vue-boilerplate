<script setup>
import {Head} from '@inertiajs/vue3';
import DashboardLayout from "@/Layouts/DefaultLayout.vue";
import {watch, ref} from 'vue';

const value = ref('');
const value1 = ref('');
watch(value, () => {
  console.log(value.value);
});
watch(value1, () => {
  console.log(value1.value);
});
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

    <a-card :bordered="false" class="rounded mt-4">
      <a-space direction="vertical">
        <a-input v-model:value="value" placeholder="Basic usage"/>
        <a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage"/>
      </a-space>
    </a-card>
  </DashboardLayout>
</template>
