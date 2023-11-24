export const axiosGetUsers = () => {
    return {
        method: 'GET',
        url: `/api/users`,
    }
}

export const axiosGetUser = (id) => {
    return {
        method: 'GET',
        url: `/users/${id}`,
    }
}

export const axiosCreateUser = () => {
    return {
        method: 'POST',
        url: `/users`,
    }
}

export const axiosUpdateUser = (id) => {
    console.log('id', id)
    return {
        method: 'PATCH',
        url: `/users/${id}`,
    }
}

export const axiosDeleteUser = (id) => {
    return {
        method: 'DELETE',
        url: `/users/${id}`,
    }
}
