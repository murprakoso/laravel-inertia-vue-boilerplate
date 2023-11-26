import useGetAxios from "@/Shared/Hooks/useGetAxios.js";
import {reactive} from "vue";
import {debounce} from "lodash";
import {axiosDeleteUser, axiosGetUsers} from "@/Pages/User/UserAxiosConfig.js";
import {userKeys} from "@/Pages/User/UserKey.js";
import useDeleteAxios from "@/Shared/Hooks/useDeleteAxios.js";

export default function useUserIndexController() {
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
     * Handle Delete
     */
    const deleteMutation = useDeleteAxios({
        config: (id) => axiosDeleteUser(id), invalidateQueryKey: ['users'], queryParams,
    })

    const handleDelete = async (data) => {
        try {
            await deleteMutation.mutateAsync({id: data.id});
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    /**
     * Fetch Data
     */
    const {
        data: userData, refetch: userDataRefetch, isFetching: userDataIsFetching,
    } = useGetAxios({
        config: axiosGetUsers(), queryParams: queryParams, // queryKey: ['users', queryParams],
        queryKey: userKeys.lists(queryParams).queryKey, // invalidateQueryKey: userKeys.lists(queryParams).queryKey,
        removeQueryKey: userKeys.lists._def,
    })

    /**
     * Handle Table Props
     */
        // prettier-ignore
    const UserTableProps = [{
            title: 'No', dataIndex: 'id', key: 'no', sorter: true, width: '5%', align: 'center',
        }, {
            title: 'Name', dataIndex: 'name', key: 'name', sorter: true, width: 200, // align: 'center',
        }, {
            title: 'Email', dataIndex: 'email', key: 'email', sorter: true, width: 200, // align: 'center',
        }, {
            title: 'Actions', dataIndex: 'actions', key: 'actions', align: 'center', fixed: 'right', width: '10%',
        }];

    return {
        queryParams,
        handleTableChange,
        handleSearch,
        handleDelete,
        userData,
        userDataRefetch,
        userDataIsFetching,
        UserTableProps,
    }
}
