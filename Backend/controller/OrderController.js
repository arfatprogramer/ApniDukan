const orderModel = require("../models/OrderModel")

const OrderController = async (req, res) => {
    try {

        const data = await orderModel.find({
            '$or': [
                {
                    '$and': [
                        { 'paymentType': "Online" },
                        { 'paymentStatus': 1 }
                    ]
                },
                { 'paymentType': "Cash On Delivery" },
            ]
        }).populate("userId").sort({ updatedAt: -1 })

        res.json({
            message: "Orders Details",
            data: data,
            error: false,
            success: true
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = OrderController