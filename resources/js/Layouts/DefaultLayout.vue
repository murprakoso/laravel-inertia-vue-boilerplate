<script setup>
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import {DownOutlined} from '@ant-design/icons-vue'
import {router} from '@inertiajs/vue3';
import {VueQueryDevTools} from "vue-query/devtools";


const gotoProfile = async () => {
  router.get('/profile')
}

const handleLogout = async () => {
  return router.post('/logout')
}
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
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link font-medium text-black" @click.prevent>
                {{ $page.props.auth.user.name }}
                <DownOutlined/>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="gotoProfile">
                    Profile
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item @click="handleLogout">
                    Logout
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
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
