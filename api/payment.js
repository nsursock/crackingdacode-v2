const stripe = require('stripe')(process.env.BACKEND_STRIPE_KEY)
import { createClient } from '@supabase/supabase-js'

export default async function handler(request, response) {

  // const supabase = createClient(
  //   process.env.SUPABASE_URL,
  //   process.env.SUPABASE_KEY
  // )
  // const storageName = process.env.NODE_ENV.startsWith('dev')
  //   ? 'permissions.dev'
  //   : 'permissions'

  switch (request.query.mode) {

    case 'error':
      try {
        let table = 'errors'
        table = process.env.NODE_ENV.startsWith('dev') ? table + '.dev' : table
        await supabase.from(table).insert(request.body)
        response.status(200).send({ success: true })
      } catch (error) {
        console.error(error.message)
        response.status(500).send({ success: false })
      }
      break;

    case 'check':
      try {
        const { data, error } = await supabase
          .from(storageName)
          .select()
          .eq('user', request.body.user)
          .filter('article', 'in', `("${request.body.article}","${request.body.url}")`)

        if (error) console.log(error);

        response.status(200).json({ data })
      } catch (err) {
        response.status(400).send({ success: false })
      }
      break;

    case 'update':
      try {
        const { user, article } = request.body
        await supabase.from(storageName).insert({
          user,
          article,
        })
        response.status(200).send({ success: true })
      } catch (err) {
        response.status(400).send({ success: false })
      }
      break;

    case 'code':
      const intent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(request.body.protection) * 100),
        currency: 'eur',
        automatic_payment_methods: { enabled: true },
      })
      response.status(200).json({ client_secret: intent.client_secret, intentId: intent.id })
      break;

    case 'donate': {
      const { currency, amount } = request.body
      const intent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(amount) * 100),
        currency: currency,
        automatic_payment_methods: { enabled: true },
      })
      response.status(200).json({ client_secret: intent.client_secret, intentId: intent.id })
    }
      break;

    default:
      const { currency, amount, domain } = request.body
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: 'Cracking Da Code',
                // images: ['https://qroiybphgipjhkmfsvnj.supabase.co/storage/v1/object/public/public/wp.jpg'],
                images: ['https://images.unsplash.com/photo-1551026922-875232ed1ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80'],
              },
              unit_amount: (amount * 100).toFixed(),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${domain}/?status=processed&amt=${amount}&ccy=${currency}`,
        cancel_url: `${domain}/?status=cancelled`,
      })
      response.status(200).json({ id: session.id })
      break;
  }

}
