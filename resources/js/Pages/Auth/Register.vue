<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons-vue'

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.post(route('register'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>

<template>
  <Head title="Register"/>
  <div style="background-color: #ececec;">
    <a-row class="h-screen flex items-center justify-center">
      <a-col :xs="22" :lg="8">
        <a-card title="Register" :bordered="false">
          <a-form
              layout="vertical"
              name="normal_register"
              class="register-form"
              @submit.prevent="submit"
          >
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
                  <MailOutlined class="site-form-item-icon"/>
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

            <a-form-item
                label="Confirm Password"
                name="password_confirmation"
            >
              <a-input-password v-model:value="form.password_confirmation">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>

              <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.password_confirmation">
                {{ form.errors.password_confirmation }}
              </span>
            </a-form-item>

            <a-form-item>
              Already registered? <a :href="route('login')">Login now!</a>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button">
                Register
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
