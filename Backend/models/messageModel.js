const mongoes=require("mongoose")

const messageModelSchema = new mongoes.Schema({
   email:String,
   name:String,
   message:String,
   number:Number,

}, {
    timestamps: true
})

const messageModel = mongoes.model("messages", messageModelSchema)
module.exports = messageModel