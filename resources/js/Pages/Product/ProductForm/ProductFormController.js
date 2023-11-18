import {reactive, ref, watch, defineProps} from "vue";
import {FormMode} from "@/Shared/Enum/FormType.js";
import {router} from "@inertiajs/vue3";

export default function useProductFormController(props) {
    const {formMode} = props
    const formState = reactive({
        name: '', price: '',
    });

    /**
     * Form State
     */

    /**
     * Watch Product
     */
    watch(() => props.product, (newProduct) => {
        if (newProduct) {
            formState.name = newProduct.name;
            formState.price = newProduct.price;
        }
    }, {immediate: true});

    /**
     * Handle Submit
     */
    const handleSubmit = () => {
        console.log('formState', formState);

        if (formMode === FormMode.CREATE) {
            console.log('create')
            router.post('/products', formState)
            return
        }

        console.log('update')
        console.log('update: ', props.product)
        router.put(`/products/${props.product.id}`, {product: props.product, ...formState})
        // router.put(route('products.update', {product: props.product}), formState)

        // router.get('/products');
        // return;
    }

    return {
        formMode, formState, handleSubmit
    }
}
