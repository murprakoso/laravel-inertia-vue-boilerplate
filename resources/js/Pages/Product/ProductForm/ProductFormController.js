import {reactive, watch} from "vue";
import {FormMode} from "@/Shared/Enum/FormType.js";
import usePostPatchAxios from "@/Shared/Hooks/usePostPatchAxios.js";
import {axiosCreateProduct, axiosUpdateProduct} from "@/Pages/Product/ProductAxiosConfig.js";
import {productKeys} from "@/Pages/Product/ProductKey.js";

export default function useProductFormController(props) {
    /**
     * Form State
     */
    const {formMode, product} = props
    const formState = reactive({
        name: '', price: '',
    });
    // Params
    const {id} = product;


    /**
     * Watch Product
     */
    watch(() => props.product, (newProduct) => {
        if (newProduct) {
            formState.name = newProduct.name;
            formState.price = newProduct.price && parseInt(newProduct.price);
        }
    }, {immediate: true});


    /**
     * Handle Mutation [Create and Update]
     */
    const {
        mutate: mutateCreateProduct, isLoading: mutateCreateProductIsLoading
    } = usePostPatchAxios({
        config: () => axiosCreateProduct(),
        redirect: '/products',
        invalidateQueryKey: productKeys.lists._def,
        onSuccessTakeover: false,
    })

    const {
        mutate: mutateUpdateProduct, isLoading: mutateUpdateProductIsLoading
    } = usePostPatchAxios({
        config: (id) => axiosUpdateProduct(id),
        redirect: '/products',
        invalidateQueryKey: productKeys.lists._def,
        onSuccessTakeover: false,
    })


    /**
     * Handle Submit
     */
    const handleSubmit = () => {
        // formState.validate()

        if (formMode === FormMode.CREATE) {
            mutateCreateProduct({data: formState})
            return;
        }

        if (formMode === FormMode.UPDATE) {
            return mutateUpdateProduct({data: formState, id: id})
        }

        // return mutateUpdateProduct({data: formState, id: id})
    }

    /**
     * Handle rules
     */
    const rules = {
        name: [{required: true, message: 'Nama produk harus diisi', trigger: 'blur'}, {
            min: 3, message: 'Nama produk minimal 3 karakter', trigger: 'blur'
        },], price: [{required: true, message: 'Harga produk harus diisi', trigger: 'blur'}, {
            type: 'number', message: 'Harga produk harus berupa angka', trigger: 'blur'
        },],
    }

    return {
        formMode, formState, handleSubmit, rules
    }
}
