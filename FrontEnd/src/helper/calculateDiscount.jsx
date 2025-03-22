const calculateDiscount=(ProductPrise,sellingPrise)=>{
    const percentage=Math.floor((sellingPrise/ProductPrise) *100)

    return 100-percentage
}

export default calculateDiscount