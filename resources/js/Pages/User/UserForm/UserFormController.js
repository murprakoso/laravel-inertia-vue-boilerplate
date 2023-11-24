import {reactive, watch} from "vue";
import {FormMode} from "@/Shared/Enum/FormType.js";
import rule from "@/Shared/Lang/validationV2.js";
import usePostPatchAxios from "@/Shared/Hooks/usePostPatchAxios.js";
import {axiosCreateUser, axiosUpdateUser} from "@/Pages/User/UserAxiosConfig.js";
import {userKeys} from "@/Pages/User/UserKey.js";
import useNotification from "@/Shared/Hooks/useNotification.js";
import {Form} from 'ant-design-vue';

export default function useUserFormController(props) {
    /**
     * State
     */
    const {formMode, user} = props
    const formState = reactive({
        name: '', email: '', password: '', password_confirmation: '',
    });
    const {id} = user;

    /**
     * Watch User
     */
    watch(() => props.user, (newUser) => {
        if (newUser) {
            formState.name = newUser.name;
            formState.email = newUser.email;
            formState.password = newUser.password;
            formState.password_confirmation = newUser.password_confirmation;
        }
    }, {immediate: true});


    /**
     * Handle Mutation [Create and Update]
     */
    const {
        mutate: mutateCreateUser, isLoading: mutateCreateUserIsLoading
    } = usePostPatchAxios({
        config: () => axiosCreateUser(),
        redirect: '/users',
        invalidateQueryKey: userKeys.lists._def,
        onSuccessTakeover: false,
        onErrorTakeover: true,
    })

    const {
        mutate: mutateUpdateUser, isLoading: mutateUpdateUserIsLoading
    } = usePostPatchAxios({
        config: (id) => axiosUpdateUser(id),
        redirect: '/users',
        invalidateQueryKey: userKeys.lists._def,
        onSuccessTakeover: false,
        onErrorTakeover: true,
    })

    const fnResponseError = (error) => {
        useNotification().openNotification({
            type: 'error', message: 'Error', description: error.response?.data?.message || 'Internal Server Error',
        });
    };


    /**
     * Rules
     */
    const validationRules = reactive({
        name: [
            {required: true, label: 'Name', message: rule.required, trigger: ['change', 'blur']},
            {min: 5, label: 'Name', message: rule.min, trigger: ['change', 'blur']}],
        email: [
            {required: true, label: 'Email', message: rule.required, trigger: ['blur', 'change']},
            {type: 'email', label: 'Email', message: rule.invalidEmail, trigger: ['blur', 'change']}
        ],
        password: [{required: true, label: 'Password', message: rule.required, trigger: ['blur', 'change']}],
        password_confirmation: [
            {required: true, label: 'Password Confirmation', message: rule.required, trigger: 'change'}
        ],
    })

    // prettier-ignore
    const {resetFields, validate, validateInfos} = Form.useForm(formState, validationRules, {
        // onValidate: (...args) => console.log(...args),
    });

    /**
     * Handle Submit
     */
    const handleSubmit = () => {
        validate().then((valid) => {
            if (!valid) {
                console.log('validate: ', validateInfos)
                console.log('error submit!! ');
                return;
            }

            if (formMode === FormMode.CREATE) {
                mutateCreateUser({data: formState}, {
                    onError: fnResponseError,
                })
                return;
            }

            if (formMode === FormMode.UPDATE) {
                return mutateUpdateUser({data: formState, id: id}, {
                    onError: fnResponseError,
                })
            }
        }).catch((err) => {
            // console.log('err: ', err)
        })
        // return;
    }

    return {
        formMode, formState, handleSubmit, validateInfos
    }
}
