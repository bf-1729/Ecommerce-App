import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

//global variables
const currency = "inr"
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Place an order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Validate input
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(), // Fixed typo from `data` to `date`
    };

    // Save the order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const placeOrderStripe = async(req,res)=>{
  try {
    
    const {userId,items,amount,address} = req.body;
    const {origin} = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(), // Fixed typo from `data` to `date`
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.price * 100
      },
      quantity:item.quantity
  }))

  line_items.push({
    price_data:{
      currency:currency,
      product_data:{
        name:"Delivery Charges"
      },
      unit_amount:deliveryCharge * 100
    },
    quantity:1
  })

  const session = await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:"payment",
  })

  res.json({success:true,session_url:session.url})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
}

//verify Stripe
const verifyStripe = async(req,res)=>{
  const {orderId,success,userId} = req.body
  try {
    
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true});
    }
    else{
      await orderModel.findByIdAndUpdate(orderId)
      res.json({success:false})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
}

const placeOrderRazorpay = async(req,res)=>{
    
}

//All Orders data for Admin Panel
const allOrders = async(req,res)=>{
    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
    }
}

const userOrders = async(req,res)=>{
    try {
        
        const {userId} = req.body;

        const orders = await orderModel.find({userId})

        res.json({success:true,orders})

    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
    }
}

//update order status from admin panel
const updateStatus = async(req,res)=>{
  try {
    
    const {orderId,status} = req.body;

    await orderModel.findByIdAndUpdate(orderId,{status})

    res.json({success:trye,message:"Status Updated"})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
    
}

export {verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}
