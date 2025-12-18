import jwt from "jsonwebtoken"

export const generateToken= (userId, res)=>{
    // create token 
  const token=   jwt.sign({
    data: userId
}, process.env.JWT_SECRET, { expiresIn:"7d" });

res.cookie("jwt", token,{
    maxAge: 7*24*60*60*1000 ,//milisecond,
    httpOnly: true, //prevent XSS attacks 
    sameSite: "strict", //CSRF attack
    secure: process.env.NODE_ENV === "development" ? false: true,

});


}