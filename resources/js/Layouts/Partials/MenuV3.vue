<script setup>
import {HomeOutlined, SettingOutlined, UserOutlined,} from '@ant-design/icons-vue';
import {h, reactive, ref} from "vue";

const selectedKeys = ref(['dashboard']);

const state = reactive({
    collapsed: false,
    selectedKeys: ['dashboard'],
    openKeys: ['setting'],
    preOpenKeys: ['setting'],
});
const items = reactive([
    {
        key: 'dashboard',
        icon: () => h(HomeOutlined),
        label: 'Dashboard',
        title: 'Dashboard',
    },
    {
        key: 'users',
        icon: () => h(UserOutlined),
        label: 'Users',
        title: 'Users',
    },
    {
        key: 'setting',
        icon: () => h(SettingOutlined),
        label: 'Settings',
        title: 'Settings',
        children: [
            {
                key: 'profile',
                label: 'Profile',
                title: 'Profile',
            },
            {
                key: 'site',
                label: 'Site',
                title: 'Site',
            },
        ],
    },
]);
</script>

<template>
    <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="items"
    ></a-menu>
</template>
