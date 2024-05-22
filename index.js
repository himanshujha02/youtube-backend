const express =require("express")
const mongoose=require('mongoose')
const cors=require('cors');
const Subscription=require('./models/subscription.js')
const Video =require('./models/Videos.js')
require('dotenv').config();

const { ObjectId } = require('mongoose').Types;

const PORT=process.env.PORT || 3000


const app=express()
app.use(express.json())
app.use(cors());
const mongourl=process.env.MONGODB_URL

mongoose.connect(mongourl,{ useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});


app.get('/video',async(req,res)=>{
    try{
        let allvideo = await Video.find({});
        
        res.json(allvideo);
    }
    catch(err){
        console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/subscribedchannel',async(req,res)=>{
    const subscribedvideos=await Video.find({subscribed:true});
    res.json(subscribedvideos);
})

app.put('/:channel',async(req,res)=>{
    const channel = req.params.channel;

    try{

        const check = await Video.findOne({ channel: channel }, 'subscribed');
    

    const newSubscribedStatus = !check.subscribed;


        const result = await Video.updateMany({ channel: channel },{$set:{subscribed:newSubscribedStatus}});
        
        res.json(  newSubscribedStatus );
        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

app.post('/subscribecheck/:channel',async(req,res)=>{
    try{
        const channel = req.params.channel
        const video = await Video.findOne({ channel: channel, subscribed: true });

    if (video) {
      res.json("found");
      console.log(video);
    } else {
      res.json("not found");
    }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

app.listen(PORT,()=>{
    console.log("server is running ")
})