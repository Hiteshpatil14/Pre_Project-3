const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jsonwebtoken = require("jsonwebtoken")
const usermodel = require("../schemas/user")
const saltvalue = 8
router.post("/signup", (req, resp) => {
    usermodel.findOne({
        username: req.body.username
    })
        .then(res => {
            // res
            if (res) {
                return resp.status(400).json({ message: "user already exist" })
            }

            bcrypt.hash(req.body.password, saltvalue)
                .then(res => {
                    if (!res) {
                        return console.log("some error generating bcrypted password")
                    }

                    const data = new usermodel({ username: req.body.username, password: res })
                    // console.log(data)
                    data.save()
                        .then(
                            res => {
                                resp.status(200).json({
                                    message: "user created successfully",
                                    data: res
                                })
                            }
                        )

                })
        })
})

router.post("/signin",(req,resp)=>{
    usermodel.findOne({username:req.body.username})
    .then(res=>{
        if(!res){
         return   resp.status(401).json({
                error:"user not found"
            })
        }

        bcrypt.compare(req.body.password,res.password)
        .then((data)=>{
            if(!data){
              return  resp.status(400).json({
                    error:"invalid password"
                })
            }

            const token=jsonwebtoken.sign({id:res._id,username:res.username},process.env.SECRET_KEY)
            resp.json({
                message:"sign in success",
                token:token
            })

        })
    })
})
module.exports = router