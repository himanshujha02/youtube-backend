const mongoose=require('mongoose')
const SubscriptionSchema=new mongoose.Schema({
    
    Subscription:String

})
const SubscriptionModel=mongoose.model("Subscription",SubscriptionSchema)
module.exports=SubscriptionModel

 