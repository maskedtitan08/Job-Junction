export const sendToken = (user,statusCode,res,message)=>{
    // console.log("JWT Called")
    const token = user.getJWTToken();
    
    const options = {
        // we are creating this expires as option which define ki itne time bd login wala session expire ho jyega
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ) ,
        httpOnly: true,  //yeh option isliye ki hmari site http pr chle agr hme ise https pr chlani  hai jo jyada secure secure hai toh hme ek secure ka option aur add krna pdega
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        message,
        token,
    })
}