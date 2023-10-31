<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {Link} from "@inertiajs/vue3";
import SideLink from "@/Components/SideLink.vue";
import {HomeIcon, UserIcon, UsersIcon, AdjustmentsHorizontalIcon} from '@heroicons/vue/24/outline'
</script>
<template>
    <aside
        class="z-20 flex-shrink-0 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block min-h-screen border-r border-gray-200 dark:border-gray-700 hidden">
        <div class="h-16 bg-gray-300 flex items-center justify-center">
            <!--Sidebar-->
            <Link :href="route('dashboard')">
                <ApplicationLogo
                    class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                />
            </Link>
        </div>

        <div class="w-full px-2">
            <div class="flex flex-col items-center w-full mt-3 border-gray-300">
                <SideLink :href="route('dashboard')" :active="route().current('dashboard')">
                    <HomeIcon class="h-6 w-6"/>
                    <span class="ml-2 text-sm font-medium">Dasboard</span>
                </SideLink>
                <SideLink :href="route('users.index')" :active="route().current('users.*')">
                    <UsersIcon class="h-6 w-6"/>
                    <span class="ml-2 text-sm font-medium">Users</span>
                </SideLink>
                <SideLink :href="route('profile.edit')" :active="route().current('profile.edit')">
                    <UserIcon class="h-6 w-6"/>
                    <span class="ml-2 text-sm font-medium">Profil</span>
                </SideLink>
            </div>
            <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
                <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
                    <AdjustmentsHorizontalIcon class="h-6 w-6"/>
                    <span class="ml-2 text-sm font-medium">Settings</span>
                </a>
            </div>
        </div>
    </aside>
</template>

