const host=`${import.meta.env.VITE_BACKEND}`;



export const signup = {
    url:`${host}/api/signup`,
    method:"POST"
}
export const googleSignup={
    url:`${host}/api/googleSignup`,
    method:"post"
}

export const login = {
    url:`${host}/api/login`,
    method:"POST"
}
export const userDate = {
    url:`${host}/api/userDetail`,
    method:"post"
}
export const userUpdate = {
    url:`${host}/api/userDataUpdate`,
    method:"post"
}
export const logout = {
    url:`${host}/api/logout`,
    method:"GET"
}
export const ForgetPassword = {
    url:`${host}/api/forgetPassword`,
    method:"post"
}
export const ResetPassword = {
    url:`${host}/api/resetPassword`,
    method:"post"
}

export const categoryApi = {
    url:`${host}/api/category`,
    method:"GET"
}
export const singleCategoryApi = {
    url:`${host}/api/singleCategory`,
    method:"POST"
}

export const getProductById = {
    url:`${host}/api/getProductById`,
    method:"POST"
}

export const Cart = {
    url:`${host}/api/cartItems`,
    method:"POST"
}


export const cartCount={
    url:`${host}/api/cartItemsCount`,
    method:"post"
    
}
export const cartItem={
     url:`${host}/api/cartItemsController`,
    method:"post"
}
export const placeOrder={
    url:`${host}/api/placeOrder`,
   method:"POST"
}

export const payment={
    url:`${host}/api/payment`,
   method:"POST"
}

export const razwePayPaymentDone={
    url:`${host}/api/razwePayPaymentDone`,
   method:"POST"
}

export const razwePayPayment={
    url:`${host}/api/razwePayPayment`,
   method:"POST"
}

// for otp send
export const sendOtp={
    url:`${host}/api/sendOtp`,
   method:"POST"
}

export const CancelOrder={
    url:`${host}/api/cancelOrder`,
   method:"POST"
}

export const OrderDetails={
    url:`${host}/api/OrderDetails`,
   method:"POST"
}
export const viewCancelSingleProduct={
    url:`${host}/api/viewCancelSingleProduct`,
    method:'Post'
}
export const viewSingleProduct={
    url:`${host}/api/viewSingleProduct`,
    method:'Post'
}



export const searchController={
    url:`${host}/api/searchController`,
    method:"POST"
}

export const filterProducts={
    url:`${host}/api/filterProducts`,
    method:"POST"
}
export const productQuantity={
    url:`${host}/api/cartItemQuantity`,
    method:"POST"
}

export const addAddress={
    url:`${host}/api/address`,
    method:"POST"
}

export const getAddress={
    url:`${host}/api/getAddress`,
    method:"post"
}

export const updateAddress={
    url:`${host}/api/updateAddress`,
    method:"post"
}

export const submitContoctForm={
    url:`${host}/api/contactForm`,
    method:"post"
}




// ****  Venters apis  ** //

export const allProduct={
    url:`${host}/vender/allProduct`,
    method:'GET'
}

export const updateUser={
    url:`${host}/admin/updateUser`,
    method:'PUT'
}

export const addProduct={
    url:`${host}/vender/addProduct`,
    method:'POST'
}

export const updateProductBackend={
    url:`${host}/vender/updateProduct`,
    method:'PUT'
}
export const VenderOrderDetails={
    url:`${host}/vender/OrderDetails`,
   method:"POST"
}
export const updateOrderStatus={
    url:`${host}/vender/updateOrderStatus`,
   method:"POST"
}

export const viewCancelOrder={
    url:`${host}/vender/viewCancelOrder`,
   method:"POST"
}
