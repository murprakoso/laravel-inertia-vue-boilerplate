import './bootstrap';
import '../css/tailwind.css';
import '../css/app.css';
import 'ant-design-vue/dist/reset.css';

import {createApp, h} from 'vue';
import {createInertiaApp, router} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, App, props, plugin}) {
        // return createApp({render: () => h(App, props)})
        //     .use(plugin)
        //     .use(ZiggyVue, Ziggy)
        //     .mount(el);

        const VueApp = createApp({render: () => h(App, props)});

        // VueApp.config.globalProperties.$date = dayjs;
        VueApp.config.globalProperties.$route = route

        VueApp.use(plugin)
            .use(ZiggyVue, Ziggy)
            .mount(el);

        return VueApp;
    },
    progress: {
        color: '#4B5563',
    },
});
