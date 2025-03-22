const displayCurrency=(num)=>{
    
    const formatter=new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:"INR",
        currencyDisplay:"symbol",
        minimumFractionDigits:0
    })

    return formatter.format(num);

}
export default displayCurrency