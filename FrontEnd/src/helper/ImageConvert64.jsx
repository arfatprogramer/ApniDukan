
const ImageConvert64 = async(image) => {
    return( await new Promise((res,rej)=>{
        const reader=new FileReader();
        reader.readAsDataURL(image);
        reader.onload=()=>{
            res(reader.result)
        }
        reader.onerror=()=>{
            rej(reader.error)
        }
    })
    
)
}

export default ImageConvert64
