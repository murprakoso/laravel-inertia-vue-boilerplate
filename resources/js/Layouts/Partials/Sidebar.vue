<script setup>
import {onMounted, ref, watch} from "vue";
import Menu from "@/Layouts/Partials/SideMenu.vue";

/**
 * Collapse the sidebar
 */
const collapsed = ref(false);

const saveToLocalStorage = () => {
    localStorage.setItem('collapsed', JSON.stringify(collapsed.value));
};

const loadFromLocalStorage = () => {
    const savedCollapsed = JSON.parse(localStorage.getItem('collapsed'));
    if (savedCollapsed !== null) {
        collapsed.value = savedCollapsed;
    }
};

watch(collapsed, () => {
    // console.log('collapsed', collapsed.value);
    saveToLocalStorage();
});

onMounted(() => {
    loadFromLocalStorage();
});

</script>

<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible :class="{'not-collapsed': !collapsed}">
        <div class="logo h-16 flex items-center justify-center text-gray-300">
            <strong>LOGO</strong>
        </div>
        <Menu/>
    </a-layout-sider>
</template>
