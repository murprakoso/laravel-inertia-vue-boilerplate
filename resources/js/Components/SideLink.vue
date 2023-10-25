<script setup>
import {computed} from 'vue';
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded'
        : 'flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
);
</script>

<template>
    <Link :href="href" :class="classes">
        <slot/>
    </Link>
</template>
