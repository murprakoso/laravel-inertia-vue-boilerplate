import {reactive, watch} from 'vue';
import axios from 'axios';
import {debounce} from "lodash";
import {useQuery} from 'vue-query';
import useDeleteAxios from "@/Shared/Hooks/useDeleteAxios.js";
import {axiosDeleteProduct, axiosGetProducts} from "@/Pages/Product/ProductAxiosConfig.js";
import useGetAxios from "@/Shared/Hooks/useGetAxios.js";
import {productKeys} from "@/Pages/Product/ProductKey.js";

export default function useProductIndexController() {
    const queryParams = reactive({
        page: 1, results: 10, search: '', sortField: 'id', sortOrder: 'DESC',
    });

    /**
     * Handle Table Change
     */
    const handleTableChange = (newPagination, filter, sorter) => {
        queryParams.page = newPagination.current;
        queryParams.results = newPagination.pageSize;
        queryParams.sortField = !sorter.field ? 'id' : sorter.field;
        queryParams.sortOrder = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    };

    /**
     * Handle Search
     */
    const handleSearch = debounce((value) => {
        queryParams.page = 1;
        queryParams.search = value.target._value;
    }, 500);

    /**
     * Fetch Data
     */
    const {
        data: productData,
        refetch: productDataRefetch,
        isFetching: productDataIsFetching,
    } = useGetAxios({
        config: axiosGetProducts(),
        queryParams: queryParams,
        // queryKey: ['products', queryParams],
        queryKey: productKeys.lists(queryParams).queryKey,
        // invalidateQueryKey: productKeys.lists(queryParams).queryKey,
        removeQueryKey: productKeys.lists._def,
    })


    /**
     * Handle Delete
     * @param data | id
     */
    const deleteMutation = useDeleteAxios({
        config: (id) => axiosDeleteProduct(id),
        invalidateQueryKey: ['products'],
        queryParams,
    });

    const handleDelete = async (data) => {
        try {
            await deleteMutation.mutateAsync({id: data.id});
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    watch(queryParams, () => {
        return productDataRefetch;
    })

    /**
     * Handle Table Props
     */
    const ProductTableProps = [{
        title: 'No', dataIndex: 'id', key: 'no', sorter: true, width: '5%', align: 'center',
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
