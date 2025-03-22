const productModel =  require("../../models/productsModel")

const searchProductController=async (req,res)=>{
    try {
        const query=req.query.q
        
        if (!query) {
            throw new Error("No Search");
        }
        const regex=new RegExp(query,'i','g')
        const data = await productModel.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    productCategory:regex
                }
            ]
        })
        res.json({
            message: "success",
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
module.exports=searchProductController