<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {LockOutlined, UserOutlined} from '@ant-design/icons-vue'

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const form = useForm({
  email: '',
  password: '',
  remember: false,
});

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  });
};
</script>

<template>
  <Head title="Log in"/>
  <div style="background-color: #ececec;">
    <a-row class="h-screen flex items-center justify-center">
      <a-col :xs="22" :lg="8">
        <a-card title="Login" :bordered="false">
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

            <a-form-item
                label="Password"
                name="password"
            >
              <a-input-password v-model:value="form.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>

              <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.password">
                {{ form.errors.password }}
              </span>
            </a-form-item>

            <a-form-item>
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="form.remember">Remember me</a-checkbox>
              </a-form-item>
              <a class="login-form-forgot" :href="route('password.request')">Forgot password</a>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button">
                Log in
              </a-button>
              Or
              <a :href="route('register')">register now!</a>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
