require('dotenv').config()
module.exports = {
  devMode: process.env.NODE_ENV !== 'production',
  environment: process.env.NODE_ENV || 'development',
  stripeKey: process.env.FRONTEND_STRIPE_KEY,
  statPwd: process.env.UMAMI_ADMIN_PWD,
  supaUrl: process.env.SUPABASE_URL,
  supaKey: process.env.SUPABASE_KEY,
  rosebud: process.env.ROSEBUD,
  url: 'https://www.crackingdacode.com',
  tagline: 'A Life Based On Music'
}
