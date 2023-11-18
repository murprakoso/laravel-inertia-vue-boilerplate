import {notification} from "ant-design-vue";

export default function useNotification() {

    const openNotification = ({type, message, description}) => {
        notification[type]({
            message: message,
            description: description,
            placement: "bottomRight",
            bottom: '10px',
            duration: 3,
        });
    };

    return {
        openNotification
    }
}
