const mongoose=require("mongoose")

const offerschema=new mongoose.Schema({
  offer_id:String,
  offer_title:String,
  offer_description:String,
  offer_sort_order:Number,
  offer_image:String,
  content:Array,
  schedule:Object,
  months_of_year:Array,
  target:String,
  pricing:Array,
  username:String
})

const offermodel=mongoose.model("offer",offerschema)
module.exports=offermodel

