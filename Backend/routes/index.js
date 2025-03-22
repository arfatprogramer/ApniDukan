const express=require("express")
const userSignUpController =require("../controller/user.signup")
const userSigninController = require("../controller/user.signin")
const userDetailController = require("../controller/user.Details")
const userLogoutController = require("../controller/user.Logout")
const authToken = require("../middleware/authToken")
const allCategory = require("../controller/product/allCategory")
const singleCategoryProductController = require("../controller/product/singleCategoryProductController")
const getProductById = require("../controller/product/getProductById")
const productCartController = require("../controller/product/productCart")
const userCountCartProductController = require("../controller/user.countCartProduct")
const cartItemsController = require("../controller/product/cartItems")
const searchProductController = require("../controller/product/searchController")
const filterProductCategoryController = require("../controller/product/filterProductCategory")
const cartItemQuantityController = require("../controller/product/cartItemQuentity")
const addAddressController = require("../controller/product/addAddressController")
const getUserAddressController = require("../controller/product/fetchAddress")
const googleSignupController = require("../controller/googleSignupController")
const userDataUpdateController = require("../controller/user.update")
const placeOrderController = require("../controller/placeOrderController")
const viewClientOrderController = require("../controller/viewClientOrders")
const cancelOrderController = require("../controller/cancelOrderController")
const sendOtpController = require("../controller/sendOtpController")
const forgotPasswordControler = require("../controller/userForgetPassword")
const userResetPasswordController = require("../controller/userResetPassword")
const cancelOrderViewController = require("../controller/cancelOrderViewController")
const viewSingleProduct = require("../controller/viewSingleProduct")
const razarPayCreateOrder = require("../controller/razarPayCreateOrder")
const razarPayCreateOrderDone = require("../controller/razarPayCreateOrderDone")
const contactFormController = require("../controller/contactFormController")

const route=express.Router()

// For user Registration
route.post("/signup",userSignUpController)

//For login
route.post("/login",userSigninController)

// to get user is Details
route.get("/userDetail",authToken,userDetailController)

//Update User Details
route.post("/userDataUpdate",authToken,userDataUpdateController)

//to logout
route.get("/logout",userLogoutController)
route.post("/forgetPassword",forgotPasswordControler)
route.post("/resetPassword",userResetPasswordController)


/****  product car route with user login  ***/

route.post("/cartItems",authToken,productCartController)
route.get("/cartItemsCount",authToken,userCountCartProductController)
route.get("/cartItems",authToken,cartItemsController)
route.post("/cartItemQuantity",authToken,cartItemQuantityController)

/****  for Order Related Route for Users   **/
route.post("/placeOrder",authToken,placeOrderController)
route.post("/OrderDetails",authToken,viewClientOrderController)
route.post("/cancelOrder",authToken,cancelOrderController)
route.post("/sendOtp",authToken,sendOtpController)

//razer pay payment controlller
route.post("/razwePayPayment",authToken,razarPayCreateOrder)
route.post("/razwePayPaymentDone",authToken,razarPayCreateOrderDone)


/**** general routs for any one no Login required**** */

route.get("/category",allCategory)
route.post("/singleCategory",singleCategoryProductController)
route.post("/getProductById",getProductById)
route.get("/searchController",searchProductController)
route.post("/filterProducts",filterProductCategoryController)

route.post("/viewCancelSingleProduct",cancelOrderViewController)
route.post("/viewSingleProduct",viewSingleProduct)


// address route
route.post("/address",authToken,addAddressController)
route.get("/getAddress",authToken,getUserAddressController)

//routes for venders
route.post("/googleSignup",googleSignupController)

//contact form data submit
route.post("/contactForm",contactFormController)



module.exports = route