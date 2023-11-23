export default function validate(params) {

    /**
     * Replace Message
     * @param message
     * @param attribute
     * @param min
     * @param max
     * @returns {*}
     */
    const replaceMessage = (message, attribute, min, max) => {
        console.log('message: ', message)
        let updatedMessage = message.replace(/:attribute/g, attribute);
        if (min !== undefined) {
            updatedMessage = updatedMessage.replace(/:min/g, min);
        }
        if (max !== undefined) {
            updatedMessage = updatedMessage.replace(/:max/g, max);
        }
        return updatedMessage;
    }


    /**
     * Handle Validation
     * @type {{}}
     */
    const result = {};
    Object.keys(params).forEach((attribute) => {
        result[attribute] = params[attribute].map((rule) => {
            // console.log('rule: ', rule)
            // if (rule.message) {
            //     rule.message = rule.message.replace(/:attribute/g, attribute);
            //     if (rule.min !== undefined) {
            //         rule.message = rule.message.replace(/:min/g, rule.min);
            //     }
            // }
            if (rule.message) {
                rule.message = replaceMessage(rule.message, attribute, rule.min, rule.max);
            }
            return rule;
        })
        // console.log('attr: ', attribute)
    });

    // console.log('params: ',params)
    return result;
}
