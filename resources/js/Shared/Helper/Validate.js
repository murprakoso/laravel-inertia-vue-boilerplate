export default function validate(params) {

    /**
     * Replace Message
     * @param message
     * @param attribute
     * @param min
     * @param max
     * @returns {*}
     */
    const replaceMessage = (message, attribute, len, max, min, type) => {
        console.log('message: ', message)
        let updatedMessage = message.replace(/:attribute/g, attribute);
        if (len !== undefined) {
            updatedMessage = updatedMessage.replace(/:len/g, len);
        }
        if (max !== undefined) {
            updatedMessage = updatedMessage.replace(/:max/g, max);
        }
        if (min !== undefined) {
            updatedMessage = updatedMessage.replace(/:min/g, min);
        }
        if (type !== undefined) {
            updatedMessage = updatedMessage.replace(/:type/g, type);
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
            // if (rule.message) {
            //     rule.message = replaceMessage(rule.message, attribute, rule.min, rule.max);
            // }
            if (rule.message) {
                let replacements = {
                    attribute,
                    len: rule.len,
                    max: rule.max,
                    min: rule.min,
                    type: rule.type,
                };

                rule.message = Object.keys(replacements).reduce((acc, key) => {
                    const regex = new RegExp(`:${key}`, 'g');
                    return acc.replace(regex, replacements[key]);
                }, rule.message);
            }
            return rule;
        })
        // console.log('attr: ', attribute)
    });

    // console.log('params: ',params)
    return result;
}
