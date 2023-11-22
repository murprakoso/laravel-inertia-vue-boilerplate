export const axiosGetProducts = () => {
    return {
        method: 'GET',
        url: `/api/products`,
    }
}

export const axiosGetProduct = (id) => {
    return {
        method: 'GET',
        url: `/products/${id}`,
    }
}

export const axiosCreateProduct = () => {
    return {
        method: 'POST',
        url: `/products`,
    }
}

export const axiosUpdateProduct = (id) => {
    console.log('id', id)
    return {
        method: 'PATCH',
        url: `/products/${id}`,
    }
}

export const axiosDeleteProduct = (id) => {
    return {
        method: 'DELETE',
        url: `/products/${id}`,
    }
}
