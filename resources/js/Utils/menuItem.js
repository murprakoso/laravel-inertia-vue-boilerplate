import {HomeOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons-vue';
import {h} from 'vue';

export const items = [
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
];
