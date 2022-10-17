import Stripe from 'stripe'
import fetch from 'node-fetch'

const stripe = new Stripe(process.env.STRIPE_API_KEY, {apiVersion: '2022-08-01'})
export const lambdaHandler = async (event, context) => {
    console.log(event, context)

    const pi = await stripe.paymentIntents.retrieve(event.PaymentIntentId)
    if (!pi.charges || pi.charges.data.length === 0 || !pi.charges.data[0].receipt_url) {
      throw new Error('No receipt found');
    }
    console.log(pi.charges.data[0].receipt_url)
  
    const products = await stripe.products.list()
    const productNames = products.data.map(p => p.name)
    console.log(productNames)
  
    const receiptUrl = pi.charges.data[0].receipt_url;
    const res = await fetch(receiptUrl)
    const html = await res.text()
    console.log(html)
  
    const purchasedProductNames = productNames.filter(p => html.includes(p))
    console.log(purchasedProductNames)
  
    return purchasedProductNames;
};
