<script setup>
import {Head, Link, useForm, usePage} from '@inertiajs/vue3';
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import {ArrowSmallLeftIcon} from '@heroicons/vue/24/outline'
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {ref} from "vue";
import InputError from "@/Components/InputError.vue";
import AlertStatus from "@/Components/AlertStatus.vue";

/**
 * State
 */
const props = defineProps({
    status: {
        type: String,
    },
});

const title = 'Edit User'
const nameInput = ref(null);
const emailInput = ref(null);
const passwordInput = ref(null);

const user = usePage().props.user;

const form = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
});

const handleFormSubmit = (event) => {
    form.put(route('users.update', {user: user}), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: (error) => {
            if (error) {
                form.reset('password', 'password_confirmation');
            }
        },
    });
}
</script>

<template>
    <Head :title="title"/>

    <DefaultLayout>
        <template #header>
            {{ title }}
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <AlertStatus :status="status"/>
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="text-gray-900 dark:text-gray-100">

                        <div class="rounded-t mb-0 py-3 px-5 border-0">
                            <div class="flex flex-wrap items-center">
                                <div class="relative w-full max-w-full flex-grow flex-1">
                                    <Link :href="route('users.index')"
                                          class="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 dark:text-gray-800 uppercase tracking-widest hover:bg-gray-300 dark:hover:bg-white focus:bg-gray-300 dark:focus:bg-white active:bg-gray-300 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                        <ArrowSmallLeftIcon class="h-4 w-4 font-bold"/>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div class="p-6">

                            <form @submit.prevent="handleFormSubmit" class="space-y-6">

                                <div>
                                    <InputLabel for="name" value="Name*"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.name"
                                        autofocus
                                        autocomplete="name"
                                    />
                                    <InputError :message="form.errors.name" class="mt-2"/>
                                </div>

                                <div>
                                    <InputLabel for="email" value="Email*"/>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        class="mt-1 block w-full"
                                        v-model="form.email"
                                        autocomplete="email"
                                    />
                                    <InputError :message="form.errors.email" class="mt-2"/>
                                </div>

                                <div>
                                    <InputLabel for="password" value="Password"/>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        class="mt-1 block w-full"
                                        v-model="form.password"
                                        autocomplete="off"
                                    />
                                    <InputError :message="form.errors.password" class="mt-2"/>
                                </div>

                                <div>
                                    <InputLabel for="password_confirmation" value="Confirm Password"/>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        class="mt-1 block w-full"
                                        v-model="form.password_confirmation"
                                        autocomplete="password_confirmation"
                                    />
                                    <InputError :message="form.errors.password_confirmation" class="mt-2"/>
                                </div>

                                <div class="flex items-center gap-4">
                                    <PrimaryButton>Save</PrimaryButton>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
