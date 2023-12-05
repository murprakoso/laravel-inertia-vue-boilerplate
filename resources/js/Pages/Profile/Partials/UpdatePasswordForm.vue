<script setup>
import {ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import {LockOutlined} from "@ant-design/icons-vue";
import useNotification from "@/Shared/Hooks/useNotification.js";

const {openNotification} = useNotification()

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const updatePassword = () => {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
      openNotification({
        type: 'success',
        message: 'Success',
        description: `Profile updated successfully.`,
      });
    },
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation');
        passwordInput.value.focus();
      }
      if (form.errors.current_password) {
        form.reset('current_password');
        currentPasswordInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <a-form @submit.prevent="updatePassword" class="mt-6 space-y-6" layout="vertical">
      <a-form-item
          label="Current Password"
          name="current_password"
      >
        <a-input-password v-model:value="form.current_password" autocomplete="current-password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>

        <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.current_password">
        {{ form.errors.current_password }}
        </span>
      </a-form-item>

      <a-form-item
          label="New Password"
          name="password"
      >
        <a-input-password v-model:value="form.password" autocomplete="new-password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>

        <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.password">
        {{ form.errors.password }}
        </span>
      </a-form-item>

      <a-form-item
          label="Confirm Password"
          name="password_confirmation"
      >
        <a-input-password v-model:value="form.password_confirmation" autocomplete="new-password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>

        <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.password_confirmation">
        {{ form.errors.password_confirmation }}
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
