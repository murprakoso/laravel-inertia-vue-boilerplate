<script setup>
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import {VueQueryDevTools} from "vue-query/devtools";
</script>

<template>
    <div>
        <VueQueryDevTools :initialIsOpen="false" position="bottom-right"/>
    </div>

    <a-layout style="min-height: 100vh">
        <Sidebar/>
        <a-layout>
            <a-layout-header>
                <div class="flex justify-between px-4">
                    <div class="font-medium">
                        <slot name="header"/>
                    </div>

                    <div>
                        <span class="font-medium">
                            {{ $page.props.auth.user.name }}
                        </span>

                        <!--                        <DropdownLink :href="route('logout')" method="post" as="button">-->
                        <!--                            Log Out-->
                        <!--                        </DropdownLink>-->
                    </div>
                </div>
            </a-layout-header>
            <a-layout-content style="margin: 20px 16px">
                <!--                <a-breadcrumb style="margin: 16px 0">-->
                <!--                    <a-breadcrumb-item>User</a-breadcrumb-item>-->
                <!--                    <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
                <!--                </a-breadcrumb>-->

                <slot/>

            </a-layout-content>
            <a-layout-footer style="text-align: center">
                ©2018 Developed by Murprakoso
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
