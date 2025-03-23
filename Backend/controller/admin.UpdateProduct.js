
const productModel = require("../models/productsModel");


const adminUpdateProductController=async (req,res)=>{
    try {
        const  { productName, brandName, productPrice, selling, Description, productImage, productCategory}=req.body.uploadProduct;
        
       

        if (!productName) {
            throw new Error("Product name is required");  
        }
        if (!brandName) {
            throw new Error("Brand name is Required");  
        }

        if (!productCategory) {
            throw new Error("productCategory  is required");  
        }

        if (!productImage) {
            throw new Error("productImage  is required");  
        }

        if (!selling) {
            throw new Error("selling prise is required");  
        }

        if (!productPrice) {
            throw new Error("product Price is required");  
        }
        if (!Description) {
            throw new Error("Description is required");  
        }
        
        const payload={
            ...req.body.uploadProduct,
        }
        const id=payload._id
        delete payload._id
        delete payload.createdAt;
      
        const update=await productModel.findByIdAndUpdate(id,payload)
        


        // console.log(productData);
        
        
        res.json({
            message:"Product Created",
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=adminUpdateProductController