import {usePage} from '@inertiajs/vue3';
import {ref} from "vue";

export default function useProductIndexController() {
    // const router = useRouter();
    const page = usePage();

    const loading = ref(false);
    const search = ref(page.props.ziggy?.query?.search || '');

    /**
     * Handle Table Change
     */
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('handle table change: ', pagination, filters, sorter);
    }

    /**
     * Handle Search
     */
    const handleSearch = (value) => {
        console.log('handle search: ', value);
    }

    /**
     * Handle Table Filter
     */
    const handleDelete = (id) => {
        console.log('handle delete: ', id);
    }

    /**
     * Handle Table
     */
    const ProductTableProps = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '20%',
        }
    ];

    return {
        loading,
        search,
        handleSearch,
        handleTableChange,
        handleDelete,
        ProductTableProps
    }
}
