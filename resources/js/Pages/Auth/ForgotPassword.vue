<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {UserOutlined} from '@ant-design/icons-vue'

defineProps({
  status: {
    type: String,
  },
});

const form = useForm({
  email: '',
});

const submit = () => {
  form.post(route('password.email'));
};
</script>

<template>
  <Head title="Forgot Password"/>
  <div style="background-color: #ececec;">
    <a-row class="h-screen flex items-center justify-center">
      <a-col :xs="22" :lg="8">
        <a-card title="Forgot Password" :bordered="false">

          <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
          </div>

          <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {{ status }}
          </div>

          <a-form
              layout="vertical"
              name="normal_login"
              class="login-form"
              @submit.prevent="submit"
          >
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
              <a-button type="primary" html-type="submit" class="login-form-button">
                Email Password Reset Link
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
