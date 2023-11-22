import useNotification from "@/Shared/Hooks/Notification.js";
import {useMutation, useQueryClient} from "vue-query";
import {router} from "@inertiajs/vue3";
import {useRouter} from "vue-router";

const usePostPatchAxios = (props) => {
    const {
        config,
        invalidateQueryKey,
        invalidateType = "inactive",
        removeQueryKey,
        removeType = "active",
        redirect,
        queryParams,
        onSuccessTakeover = false,
    } = props;

    // const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {openNotification} = useNotification()

    const axiosPostPatch = async ({data, id, id2}) => {
        let localConfig = id2 ? config(id, id2) : id ? config(id) : config();

        const response = await axios({
            ...localConfig, data: data, params: queryParams,
        });
        return response.data;
    };

    const onSuccessFn = async (data) => {
        console.log('data', data)
        setTimeout(() => {
            openNotification({
                type: `${data.type}`,
                message: `${data.type}`,
                description: data.message || "Data berhasil disimpan",
                duration: 4,
            });
        }, 300)

        if (removeQueryKey) {
            queryClient.removeQueries({
                queryKey: removeQueryKey,
                // refetchType: "all",
                type: removeType,
            });
        }

        if (invalidateQueryKey) {
            await queryClient.invalidateQueries({
                queryKey: invalidateQueryKey,
                type: invalidateType,
            });
        }

        if (redirect) {
            if (typeof redirect == "number") router.visit(redirect);
            else router.visit(redirect)
        }
    }
    const onErrorFn = async (err) => {
        console.log('err', err)
        setTimeout(() => {
            openNotification({
                type: `error`,
                message: `${err.message}`,
                description: err.response.data.message || "Internal Server Error",
                duration: 4,
            });
        }, 300)
    }

    const mutation = useMutation(({data, id, id2}) => axiosPostPatch({data, id, id2}), {
        onSuccess: async (data) => {
            if (!onSuccessTakeover) await onSuccessFn(data);
        },
        onError: async (err) => {
            await onErrorFn(err);
        },
    });

    return {...mutation, onSuccessFn, onErrorFn};
}

export default usePostPatchAxios;
