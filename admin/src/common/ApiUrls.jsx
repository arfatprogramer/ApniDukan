const host=import.meta.env.VITE_BACKEND;

export const login={
    url:`${host}/admin/login`,
    method:'post'
}

export const logOut={
    url:`${host}/admin/logout`,
    method:'post'
}

export const adminDate={
    url:`${host}/admin/data`,
    method:'POST'
}

export const updateAdminProfle={
    url:`${host}/admin/updateAdminProfle`,
    method:'PUT'
}

export const getAllUsers={
    url:`${host}/admin/allUsers`,
    method:'POST'
}

export const updateUser={
    url:`${host}/admin/updateUser`,
    method:'PUT'
}
export const userDeleteUrl={
    url:`${host}/admin/userDelete`,
    method:'delete'
}

export const addProduct={
    url:`${host}/admin/newProduct`,
    method:'POST'
}

export const allProduct={
    url:`${host}/admin/allProduct`,
    method:'GET'
}

export const updateProductBackend={
    url:`${host}/admin/updateProduct`,
    method:'PUT'
}

export const deleteProduct={
    url:`${host}/admin/deleteProduct`,
    method:'delete'
}

export const cancleOrders={
    url:`${host}/admin/cancleOrders`,
    method:'post'
}

export const OrderDetails={
    url:`${host}/admin/OrderDetails`,
    method:'Post'
}

export const viewCancelSingleProduct={
    url:`${host}/api/viewCancelSingleProduct`,
    method:'Post'
}
export const viewSingleProduct={
    url:`${host}/api/viewSingleProduct`,
    method:'Post'
}

export const dashboard={
    url:`${host}/admin/dashboard`,
    method:'get'
}

export const messages={
    url:`${host}/admin/messages`,
    method:'get'
}
