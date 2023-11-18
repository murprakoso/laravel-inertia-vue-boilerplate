import {reactive, watch} from 'vue';
import axios from 'axios';
import {debounce} from "lodash";
import {useQuery} from 'vue-query';
import {router} from "@inertiajs/vue3";

export default function useProductIndexController() {
    const queryParams = reactive({
        page: 1, results: 10, search: '', sortField: 'created_at', sortOrder: 'DESC',
    });

    /**
     * Handle Table Change
     */
    const handleTableChange = (newPagination, filter, sorter) => {
        queryParams.page = newPagination.current;
        queryParams.results = newPagination.pageSize;
        queryParams.sortField = sorter.field === 'no' ? 'id' : sorter.field;
        queryParams.sortOrder = sorter.order === 'ascend' ? 'ASC' : 'DESC';
        // console.log('sorter', sorter)
    };

    /**
     * Handle Search
     */
    const handleSearch = debounce((value) => {
        queryParams.page = 1;
        queryParams.search = value.target._value;
        // console.log('queryParams', queryParams)
    }, 500);

    /**
     * Fetch Data
     */
    const {
        data: productData, refetch: productDataRefetch, isFetching: productDataIsFetching,
    } = useQuery(['products', queryParams], async () => {
        const res = await axios.get('api/products', {
            params: queryParams
        });
        return res.data;
    });

    /**
     * Handle Delete
     * @param data | id
     */
    const handleDelete = (data) => {
        // console.log('handle delete: ', data);
        router.delete(`/products/${data.id}`, {product: data})
        // queryParams.page = 1;
        return productDataRefetch;
    }

    watch(queryParams, () => {
        return productDataRefetch;
    })

    /**
     * Handle Table Props
     */
    const ProductTableProps = [{
        title: 'No', dataIndex: 'no', key: 'no', sorter: true, width: '5%', align: 'center',
    }, {
        title: 'Name', dataIndex: 'name', key: 'name', sorter: true, width: '50%',
    }, {
        title: 'Price', dataIndex: 'price', key: 'price', sorter: true, width: '30%',
    }, {
        title: 'Actions', dataIndex: 'actions', key: 'actions', align: 'center', fixed: 'right', width: '10%',
    }];

    return {
        productData,
        productDataRefetch,
        productDataIsFetching,
        handleTableChange,
        handleSearch,
        handleDelete,
        ProductTableProps,
    }
}
