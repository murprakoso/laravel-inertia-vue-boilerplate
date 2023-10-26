<script setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline"
import {ref} from "vue";
// import {onMounted, ref} from 'vue';
//
// defineProps({
//   modelValue: {
//     type: String,
//     required: true,
//   },
// });
//
// defineEmits(['update:modelValue']);
//
const search = ref(null);
//
// onMounted(() => {
//   if (input.value.hasAttribute('autofocus')) {
//     input.value.focus();
//   }
// });
//
// defineExpose({focus: () => input.value.focus()});
</script>

<template>
  <!--  <div class="relative mb-4 flex w-full flex-wrap items-stretch">-->
  <!--    <input-->
  <!--        type="search"-->
  <!--        class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"-->
  <!--        placeholder="Search"-->
  <!--        aria-label="Search"-->
  <!--        aria-describedby="button-addon3"/>-->

  <!--    &lt;!&ndash;Search button&ndash;&gt;-->
  <!--    <button-->
  <!--        class="relative z-[2] rounded-r border-2 px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"-->
  <!--        type="button"-->
  <!--        id="button-addon3"-->
  <!--        users-te-ripple-init>-->
  <!--      <MagnifyingGlassIcon class="h-4 w-4"/>-->
  <!--    </button>-->
  <!--  </div>-->

  <div class="relative text-gray-600 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <MagnifyingGlassIcon class="h-4 w-4"/>
        </button>
      </span>
    <input type="search" name="q"
           class="border-gray-300 py-2 text-sm text-white bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
           placeholder="Search..." autocomplete="off">
  </div>
</template>
