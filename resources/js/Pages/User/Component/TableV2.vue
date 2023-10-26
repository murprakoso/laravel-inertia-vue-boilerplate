<script setup>

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="block w-full overflow-x-auto">
    <table class="items-center bg-transparent w-full border-collapse " users="users">
      <thead>
      <tr>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Name
        </th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Email
        </th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Created At
        </th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Bounce rate
        </th>
      </tr>
      </thead>

      <tbody>
      <tr class="hover:bg-gray-50" v-for="(item,index) in users" :key="index">
        <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
          {{ item.name }}
        </th>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {{ item.email }}
        </td>
        <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {{ item.created_at }}
        </td>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
          46,53%
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

