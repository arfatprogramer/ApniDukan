const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema(
    {
        name: String,
        number:String,
        line1:String,
        line2:String,
        city: String,
        state: String,
        pinCode: String,
        landmark:String,
        number2:String,
        userid: {
            ref: 'user',
            type: String
        }
    }, {
    timestamps: true
})

const addressModel = mongoose.model("Address", addressSchema)
module.exports = addressModel