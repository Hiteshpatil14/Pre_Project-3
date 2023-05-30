const express=require("express")
const router=express.Router()
const offermodel=require("../schemas/offer")
const tokenvalidation=require("../Tokenvalidation")


router.post("/create",tokenvalidation,(req,resp)=>{
    // console.log(req.body)
    req.params
    const data=new offermodel(req.body)
    data.save()
    .then(res=>{
        resp.json({
            data:res
        })
    })
})

router.put("/update/:id",tokenvalidation,(req,resp)=>{
      offermodel.updateOne({_id:req.params.id},...req.body)
    .then(res=>{
        resp.status(200).json({
            status:"success",
            data:res
        })
    })
})

router.delete("/delete/:id",tokenvalidation,(req,resp)=>{
    offermodel.deleteOne({_id:req.params.id})
    .then(res=>{
        resp.status(201).json({
            status:"success",
            data:res
        })
    })
})

module.exports=router



