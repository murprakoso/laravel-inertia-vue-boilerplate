<script setup>
import {onMounted, reactive, watch} from "vue";
import {router} from "@inertiajs/vue3";
import {items} from "@/Utils/menuItem.js";

const state = reactive({
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
    preOpenKeys: [],
});


const handleClick = (e) => {
    const parentKey = e.key.length > 1 ? e.keyPath[0] : e.key;
    const activeMenuData = {parent: parentKey, key: e.key};
    localStorage.setItem("activeMenu", JSON.stringify(activeMenuData));

    state.selectedKeys = [e.key];
    state.openKeys = [parentKey];
    state.preOpenKeys = [parentKey];

    router.visit("/" + e.key);
};

const setActiveKeys = () => {
    const {pathname} = window.location;
    const splitPathname = pathname.split("/");
    // const currentPath = splitPathname[splitPathname.length - 1];
    const currentPath = splitPathname[1];

    const menuItem = items.find((item) => {
        if (item.key === currentPath) {
            return true;
        } else if (item.children) {
            return item.children.some((child) => child.key === currentPath);
        }
        return false;
    });

    if (menuItem) {
        if (menuItem.children) {
            state.selectedKeys = [currentPath];
            state.openKeys = [menuItem.key];
        } else {
            state.selectedKeys = [menuItem.key];
            state.openKeys = [];
        }
    }
};

onMounted(() => {
    setActiveKeys();
});
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
