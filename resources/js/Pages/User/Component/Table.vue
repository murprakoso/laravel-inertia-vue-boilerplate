<script setup>

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

const handleActionClick = (action, row) => {
    if (action === 'edit') {
        console.log(`Edit data:`, row);
        // console.log(`Edit data:`);
    } else if (action === 'delete') {
        // console.log(`Hapus data dengan ID:`);
        console.log(`Hapus data:`, row);
    }
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
                <th v-if="actions"
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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
                <th>
                    <button v-for="action in actions" :key="action.type" @click="handleActionClick(action.type, item)">
                        {{ action.label }}
                    </button>
                </th>
            </tr>
            </tbody>
        </table>
    </div>
</template>

