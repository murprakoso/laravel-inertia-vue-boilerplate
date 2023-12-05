<script setup>
import {nextTick, ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import {LockOutlined} from '@ant-design/icons-vue'

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
  password: '',
});

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;

  nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
  form.delete(route('profile.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};

const closeModal = () => {
  confirmingUserDeletion.value = false;

  form.reset();
};
</script>

<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Once your account is deleted, all of its resources and users will be permanently deleted. Before deleting
        your account, please download any users or information that you wish to retain.
      </p>
    </header>

    <a-button type="primary" danger @click="confirmUserDeletion">Delete Account</a-button>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Are you sure you want to delete your account?
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and users will be permanently deleted. Please
          enter your password to confirm you would like to permanently delete your account.
        </p>

        <div class="mt-6">
          <a-form layout="vertical">
            <a-form-item
                label="Password"
                name="password"
            >
              <a-input-password id="password" v-model:value="form.password" ref="passwordInput"
                                @keyup.enter="deleteUser">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>

              <span class="text-sm text-red-600 dark:text-red-400" v-show="form.errors.password">
                {{ form.errors.password }}
              </span>
            </a-form-item>
          </a-form>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <a-button @click="closeModal">Cancel</a-button>

          <a-button type="primary" danger :loading="form.processing" @click="deleteUser" class="font-semibold">
            Delete Account
          </a-button>
        </div>
      </div>
    </Modal>

  </section>
</template>
