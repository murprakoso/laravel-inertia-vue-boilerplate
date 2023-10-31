<script setup>
import {onMounted, reactive, watch} from "vue";
import {router} from "@inertiajs/vue3";
import {items} from "@/Utils/menuItem.js";

const state = reactive({
  collapsed: false,
  selectedKeys: ['dashboard'],
  openKeys: [],
  preOpenKeys: [],
});


const handleClick = (e) => {
  // Get key from parent key if exists
  const parentKey = e.key.length > 1 ? e.keyPath[0] : e.key;

  // Save data as an object in Local Storage
  const activeMenuData = {parent: parentKey, key: e.key};
  localStorage.setItem('activeMenu', JSON.stringify(activeMenuData));

  state.selectedKeys = [e.key];
  state.openKeys = [parentKey];
  state.preOpenKeys = [parentKey];

  // Navigate using router
  router.visit('/' + e.key);
};

watch(() => state.openKeys, (val) => {
  console.log('openKeys', val);
});

onMounted(() => {
  const savedActiveMenu = localStorage.getItem('activeMenu');
  if (savedActiveMenu !== null) {
    const activeMenuData = JSON.parse(savedActiveMenu);
    const {parent, key} = activeMenuData;

    state.selectedKeys = [key];
    state.openKeys = [parent];
    state.preOpenKeys = [parent];
  }
})
</script>

<template>
  <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="handleClick"
  ></a-menu>
</template>
