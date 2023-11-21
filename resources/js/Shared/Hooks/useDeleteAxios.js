import {useMutation, useQueryClient} from 'vue-query';
import axios from 'axios';
import useNotification from "@/Shared/Hooks/Notification.js";

const useDeleteAxios = (props) => {
    const {config, invalidateQueryKey, queryParams} = props;
    const queryClient = useQueryClient();

    const {openNotification} = useNotification();

    const axiosDelete = async ({id, id2}) => {
        let localConfig = id2 ? config(id, id2) : config(id);
        const response = await axios.delete(localConfig.url, {
            ...localConfig,
            params: queryParams,
        });
        return response.data;
    };

    const mutation = useMutation(
        ({id, id2}) => axiosDelete({id, id2}),
        {
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({queryKey: invalidateQueryKey});
                openNotification({
                    type: data.type,
                    message: data.type,
                    description: `${data.message}`,
                });
            },
            onError: (err) => {
                openNotification({
                    type: "error",
                    title: "Error",
                    message: err.response.data.message,
                });
            },
        }
    );

    return mutation;
};

export default useDeleteAxios;
