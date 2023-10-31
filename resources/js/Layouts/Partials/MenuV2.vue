<script setup>
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';
import {ref} from "vue";

const selectedKeys = ref(['dashboard']);
</script>

<template>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="dashboard">
            <HomeOutlined/>
            <span>Home</span>
        </a-menu-item>
        <a-menu-item key="user">
            <UserOutlined/>
            <span>User</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
            <template #title>

            <span class="flex items-center">
                <SettingOutlined/>
                <span>Setting</span>
            </span>
            </template>
            <a-menu-item key="profile">Profile</a-menu-item>
            <a-menu-item key="site">Site</a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>
