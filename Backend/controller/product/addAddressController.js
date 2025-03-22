const addressModel=require("../../models/addressModel")

const addAddressController=async (req,res)=>{
    try {
        const data=req.body
        const userid=req.id    
        const payload={
            ...data.address,
            userid:userid
        }
        console.log(payload);
        
        const newAddress=new addressModel(payload)
        const address=  await newAddress.save()

        res.json({
            message: "Address Added",
            data: address,
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
module.exports=addAddressController