const express = require("express")
const adminLoginController=require("../controller/admin.login")
const adminSignupController = require("../controller/admin.signup")
const adminLogOutController = require("../controller/admin.logout")
const adminAuthToken = require("../middleware/admin.authToken")
const adminDataController = require("../controller/admin.Details")
const adminGetAllUserController =require("../controller/admin.getAllUsers")
const adminUpdateUserController = require("../controller/admin.updateUser")
const adminAddProductController = require("../controller/admin.AddProduct")
const getAllProductController = require("../controller/getAllProduct")
const adminUpdateProductController = require("../controller/admin.UpdateProduct")
const OrderController = require("../controller/OrderController")
const dashboardController = require("../controller/dashboardController")
const adminProfileUpdateController = require("../controller/adminProfileUpdateController")
const adminDeleteUser = require("../controller/adminDeleteUser")
const adminDeleteProduct = require("../controller/adminDeleteProduct")
const adminCancelOrderViewController = require("../controller/adminCancelOrderViewController")
const contactFormViewController = require("../controller/contactFormViewController")
const route= express.Router()

route.post('/signup', adminSignupController)

route.post('/login', adminLoginController)

route.post('/logout',adminAuthToken, adminLogOutController)
route.post('/data',adminAuthToken, adminDataController)


route.post("/allUsers",adminAuthToken,adminGetAllUserController)
route.put("/updateUser",adminAuthToken,adminUpdateUserController)
route.delete("/userDelete",adminAuthToken,adminDeleteUser)

//Update admin Profile
route.put("/updateAdminProfle",adminAuthToken,adminProfileUpdateController)

// add New product
route.post("/newProduct",adminAuthToken,adminAddProductController)

// update product
route.put('/updateProduct',adminAuthToken,adminUpdateProductController)
route.delete('/deleteProduct',adminAuthToken,adminDeleteProduct)
route.post('/cancleOrders',adminAuthToken,adminCancelOrderViewController)


//common for all
route.get('/allProduct',getAllProductController)

//Orders related Routes
route.post('/OrderDetails',adminAuthToken,OrderController)


route.get('/dashboard',dashboardController)

// Contct View messges controller
route.get("/messages",contactFormViewController)





module.exports=route

