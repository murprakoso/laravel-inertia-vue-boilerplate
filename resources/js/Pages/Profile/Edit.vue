<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {Head} from '@inertiajs/vue3';
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";
</script>

<template>
  <Head title="Profile"/>

  <DefaultLayout>
    <template #header>
      Profile
    </template>

    <a-card>
      <a-row :gutter="16" class="mb-6">
        <a-col :span="12">
          <UpdateProfileInformationForm/>
        </a-col>
      </a-row>
    </a-card>
  </DefaultLayout>
</template>
