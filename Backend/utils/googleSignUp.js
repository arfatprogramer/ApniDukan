const googleSignUp = ({ name, email,password })=>{
    
    
    return `
<div>
    <p>Dear, ${name}</p>
    <p>Thank you for registering ApniDukan.</p>
     <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">  Username :
        ${email}
    </div>
    <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">  Password :
        ${password}
    </div>
    <p>Enter this Username and Password in the apniDukan website to proceed with Login.</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>Apnidukan</p>
</div>
    `
}

module.exports= googleSignUp