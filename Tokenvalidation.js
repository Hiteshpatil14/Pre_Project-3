 const jsonwebtoken=require("jsonwebtoken")
 
 
 
 module.exports=(req,resp,next)=>{
    console.log("hiii")
    const token=req.headers.authorization
   
    if(!token){
        return resp.json({error:"invalid token"})
    }
   //Bearer token
    jsonwebtoken.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err){
            resp.json({
                error:"you must be logged in"
            })
        }
        console.log(payload)
        req.body.username=payload.username
        next()
    })
  }