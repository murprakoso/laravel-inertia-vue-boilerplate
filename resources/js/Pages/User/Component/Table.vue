<script setup>
import {Link, useForm} from "@inertiajs/vue3";
import ModalDelete from "@/Components/ModalDelete.vue";
import {ref} from "vue";
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  indexNumber: {
    type: Boolean,
    default: false,
  },
  actions: {
    type: Array,
    required: false,
  }
});


/**
 * Delete
 */
const form = useForm({});
const confirmingUserDeletion = ref(false);
const userToDelete = ref(null);

const confirmUserDeletion = (user) => {
  confirmingUserDeletion.value = true;
  userToDelete.value = user;

  // nextTick(() => passwordInput.value.focus());
};

const closeModal = () => {
  confirmingUserDeletion.value = false;
};

const deleteUser = () => {
  form.delete(route('users.destroy', {user: userToDelete.value}), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    // onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};
</script>

<template>
  <div class="block w-full overflow-x-auto">
    <table class="items-center bg-transparent w-full border-collapse " users="users" headers="headers">
      <thead>
      <tr>
        <th v-if="indexNumber"
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          No
        </th>
        <th v-for="header in headers" :key="header"
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          {{ header }}
        </th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Action
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(item,index) in users" :key="index" class="hover:bg-gray-50">
        <th v-if="indexNumber"
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {{ index + 1 }}
        </th>
        <th v-for="header in headers" :key="header"
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {{ item[header.toLowerCase()] }}
        </th>
        <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 gap-2 flex">
          <Link :href="route('users.edit', {user: item})"
                class="bg-indigo-50 p-2 rounded bg-indigo-100">
            Edit
          </Link>
          <button @click="confirmUserDeletion(item)"
                  class="bg-indigo-50 p-2 rounded bg-red-400 text-white">
            Delete
          </button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <!--Delete Modal-->
  <ModalDelete :show="confirmingUserDeletion" @close="closeModal">
    <div class="p-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Are you sure you want to delete your account?
      </h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Once your account is deleted, all of its resources and users will be permanently
        deleted. Please
        enter your password to confirm you would like to permanently delete your account.
      </p>

      <div class="mt-6 flex justify-end">
        <SecondaryButton @click="closeModal"> Cancel</SecondaryButton>

        <DangerButton
            class="ml-3"
            @click="deleteUser"
        >
          Delete User
        </DangerButton>
      </div>
    </div>
  </ModalDelete>
</template>

