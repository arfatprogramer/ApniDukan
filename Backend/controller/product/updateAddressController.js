const addressModel=require("../../models/addressModel")
const updateAddressController=async (req,res)=>{
    try {
        const {address} = req.body;
        console.log(address);
        res.json({
            message: "Address updated successfully",
            data:address,
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            data:[],
            error:true,
            success:false
        })
    }
}

module.exports=updateAddressController