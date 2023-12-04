<script setup>
import {useForm, usePage} from "@inertiajs/vue3";
import {UserOutlined} from "@ant-design/icons-vue";
import {watch} from "vue";
import useNotification from "@/Shared/Hooks/useNotification.js";

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const user = usePage().props.auth.user;
const {openNotification} = useNotification()

const form = useForm({
  name: user.name,
  email: user.email,
});

watch(() => form.recentlySuccessful, (successful) => {
  if (successful) {
    openNotification({
      type: 'success',
      message: 'Success',
      description: `Profile updated successfully.`,
    });
  }
})
</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Update your account's profile information and email address.
      </p>
    </header>

    <a-form @submit.prevent="form.patch(route('profile.update'))" class="mt-6 space-y-6" layout="vertical">
      <a-form-item
          label="Name"
          name="name"
      >
        <a-input v-model:value="form.name">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>

        <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.name">
                {{ form.errors.name }}
              </span>
      </a-form-item>

      <a-form-item
          label="Email"
          name="email"
      >
        <a-input v-model:value="form.email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>

        <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.email">
         {{ form.errors.email }}
        </span>
      </a-form-item>

      <a-form-item>
        <div class="flex">
          <a-button type="primary" html-type="submit" :loading="form.processing">
            <span v-if="form.recentlySuccessful">Saved.</span>
            <span v-else>Save</span>
          </a-button>
        </div>
      </a-form-item>

    </a-form>
  </section>
</template>
