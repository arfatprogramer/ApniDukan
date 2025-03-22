const { model } = require("mongoose");
const OrderModel = require("../models/OrderModel")
const productsModel = require("../models/productsModel");
const userModel = require("../models/userModel");



const dashboardController = async (req, res) => {
    try {
        // to get the numbers of produt and categories
        const totalProduct = await productsModel.find({}, { productCategory: 1, _id: 0 })

        // to get the new users
        const Users = await userModel.find({}, { updatedAt: 1 })
        const today = new Date()
        let newUsers = 0
        Users.map((user) => {
            const date = new Date(user.updatedAt)
            const diffTime = Math.abs(date.getTime() - today.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 5) {
                newUsers += 1
            }
        })

        //to get total sales
        const totalSales = await OrderModel.find({ deliveryStatus: "Delivered" }, { selling: 1, quantity: 1, updatedAt: 1 }).sort({updatedAt:-1})
        let totalSalesAmount = 0
        let salesOverView={}
        totalSales.map((sale) => {
            totalSalesAmount += sale.selling * sale.quantity
            const date = new Date(sale.updatedAt) 
            const month = date.toLocaleString('default', { month: 'short' })
            if (!salesOverView[month]) {
                salesOverView[month]=0
            }
            salesOverView[month] += (sale.selling * sale.quantity) 
            
        })
        const salesOverViewArray=Object.keys(salesOverView).map((sales)=>({
            name:sales,
            sales:salesOverView[sales],
        }))
       
       // calculate Conversion Rate
       const totalUsers = await userModel.find({}).countDocuments()
       const totalOrders = await OrderModel.find({}).countDocuments()
       const conversionRate = (totalOrders / totalUsers) * 100

        
        const data = {
            totalProduct,
            newUsers,
            totalSalesAmount,
            salesOverViewArray,
            conversionRate
        }

        res.json({
            message: "Dashboard",
            data: data,
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = dashboardController