import {notification} from "ant-design-vue";

export default function useNotification() {

    const openNotification = ({type, message, description, duration = 3}) => {
        notification[type]({
            message: message,
            description: description,
            placement: "bottomRight",
            bottom: '10px',
            duration: duration,
        });
    };

    return {
        openNotification
    }
}
