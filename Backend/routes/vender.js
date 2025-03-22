const express=require("express")
const venderAuthToken=require("../middleware/venderAuth")
const venderUpdateProductController=require('../controller/venders/venderUpdateProduct')
const venderAddProductController = require("../controller/venders/venderAddProduct")
const allProductController = require("../controller/venders/allProduct")
const viewVenderOrderController = require("../controller/venders/viewOrderController")
const orderUpdateController = require("../controller/venders/orderUpdateController")
const viewCancelOrderController = require("../controller/venders/viewCancelOrderController")

const route=express.Router()
route.use(venderAuthToken)
route.put("/updateProduct",venderUpdateProductController)
route.post("/addProduct",venderAddProductController)
route.get("/allProduct",allProductController)
route.post("/OrderDetails",viewVenderOrderController)
route.post("/updateOrderStatus",orderUpdateController)
route.post("/viewCancelOrder",viewCancelOrderController)

module.exports=route

