import { Order } from '@/models/Order';
import mongoose from 'mongoose';

const stripe = require('stripe')(process.env.STRIPE_SK);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // If needed

// Instead of config, add:
export const maxDuration = 60; // or whatever limit you need

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);


    const sig = req.headers.get('stripe-signature');
    let event;

    try {

        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event= stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch(e) {
        console.error('stripe error');
        console.log(e)
        return Response.json(e, {status: 400});
    }

     console.log('==== STRIPE WEBHOOK ====');
  console.log('Event type:', event?.type);
  console.log('Full event:', JSON.stringify(event, null, 2));

     if(event.type === 'checkout.session.completed'){
        console.log(event);
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaid = event?.data?.object?.payment_status === 'paid';
        if (isPaid) {
          await Order.updateOne({_id:orderId}, {paid:true});
        }
      }


    return Response.json('ok', {status: 200});
}