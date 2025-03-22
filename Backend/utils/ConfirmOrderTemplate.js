const ConfirmOrderTemplate = ({ name, otp })=>{
    return `
<div>
    <p>Dear, ${name}</p>
    <p>You're Otp for Verify Order is : .</p>
    <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>This otp is valid for 1 hour only. Enter this otp in the Apnidukan website to proceed with Confirm Your Order.</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>ApniDukan</p>
</div>
    `
}
module.exports= ConfirmOrderTemplate