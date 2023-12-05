<script setup>
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {Head} from '@inertiajs/vue3';
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm.vue";

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});
</script>

<template>
  <Head title="Profile"/>

  <DefaultLayout>
    <template #header>
      Profile
    </template>

    <a-card class="mb-3">
      <a-row :gutter="16" class="mb-2">
        <a-col :span="12">
          <UpdateProfileInformationForm
              :must-verify-email="mustVerifyEmail"
              :status="status"
          />
        </a-col>
      </a-row>
    </a-card>

    <a-card class="mb-3">
      <a-row :gutter="16" class="mb-6">
        <a-col :span="12">
          <UpdatePasswordForm/>
        </a-col>
      </a-row>
    </a-card>

    <a-card>
      <a-row :gutter="16" class="mb-6">
        <a-col :span="12">
          <DeleteUserForm/>
        </a-col>
      </a-row>
    </a-card>
  </DefaultLayout>
</template>
