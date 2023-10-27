const express=require('express');
const app=express();
require('dotenv').config();
const body_parser=require('body-parser');
const cors=require('cors');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

app.use(body_parser.urlencoded({
    extended:true
}))
app.use(express.json());

app.get("/",async(req,res)=>{
  res.send("This is Praveen")
})
app.post('/payment',cors() ,async(req,res)=>{
 const {amount,id}=req.body;
 console.log(amount)


 try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "INR",   
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    console.log(payment.amount_details.tip);
    res.status(200).json({
        status:'success',
        details:payment
    })
    
 } catch (error) {
    console.log("error",error)
    res.status(400).json({
        status:"fails",
        message:"payment failed"
    })
 }
})

app.use(body_parser.json())
app.use(cors());
app.listen(process.env.PORT||4000,()=>{
    console.log("server running on port 4000");
})