const mongoes=require("mongoose")

const otpModelSchema = new mongoes.Schema({
   email:String,
   userId:String,
   otp:Number,

}, {
    timestamps: true
})

const otpModel = mongoes.model("otp", otpModelSchema)
module.exports = otpModel