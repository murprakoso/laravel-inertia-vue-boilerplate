<script setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline"
import {onMounted, ref} from "vue";

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
});

defineEmits(['update:modelValue']);

const search = ref(null);

// onMounted(() => {
//     if (search.value.hasAttribute('autofocus')) {
//         search.value.focus();
//     }
// });

defineExpose({focus: () => search.value.focus()});
</script>

<template>
    <div class="relative text-gray-600 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <MagnifyingGlassIcon class="h-4 w-4"/>
        </button>
      </span>
        <input
            class="border-gray-300 py-2 text-sm text-gray-500 bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            placeholder="Search..."
        />
    </div>
</template>
