// const cloudinaryUrl=`https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_NAME}/image/upload`
const cloudinaryUrl=`https://api.cloudinary.com/v1_1/dlodrxkdh/image/upload`

 const uploadProductImage = async (image)=>{
    const uploadImage=image

    const uploadData=new FormData()
    uploadData.append('file',uploadImage)
    // uploadData.append('upload_preset',import.meta.env.CLOUDINARY_UPLOAD_PRESET)
    uploadData.append('upload_preset',"zamzam_products")


    const serverResponser= await fetch(cloudinaryUrl,{
        method: 'POST',
        body: uploadData,
        
    })

    return serverResponser.json()
}
export default uploadProductImage


