import {watchEffect} from 'vue';
import {useQuery, useQueryClient} from 'vue-query';
import axios from 'axios';
import useNotification from "@/Shared/Hooks/useNotification.js";

const useGetAxios = (props) => {
    // Destructuring props
    const {
        config, queryKey, removeQueryKey, invalidateQueryKey, queryParams, enabled = true,
    } = props;

    const {openNotification} = useNotification();

    const queryClient = useQueryClient();

    const axiosGet = async () => {
        const response = await axios({
            ...config, params: queryParams,
        });
        console.log('queryParams', queryParams)
        return response.data;
    };

    const result = useQuery({
        enabled: enabled, queryKey: queryKey, queryFn: axiosGet, keepPreviousData: true,
    });

    watchEffect(() => {
        if (result.status === result.isSuccess) {
            // console.log('SUCCESS')
            if (invalidateQueryKey) {
                queryClient.invalidateQueries({
                    queryKey: invalidateQueryKey,
                });
            }

            if (removeQueryKey) {
                queryClient.removeQueries({
                    queryKey: removeQueryKey, type: "inactive",
                });
            }
        }

        if (result.status === result.isError) {
            console.log('error')
            // openNotification({
            //     type: "error",
            //     title: "Error",
            //     message: `${result.data.message}`,
            // });
        }
    });

    watchEffect(() => {
        if (result.status === result.isIdle) {
            openNotification({
                type: "error", title: "Error", message: "Terjadi Kesalahan Pada Internet Anda, Silahkan Coba Lagi.",
            });
        }
    })

    return result;
}

export default useGetAxios;
