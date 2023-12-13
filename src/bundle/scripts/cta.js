export default () => ({
  isFetching: false,
  error: '',
  amount: 3.00,
  currency: 'USD',
  stripe: null,
  elements: null,
  intentId: '',
  isFetching2: false,
  email: '',

  async pay() {
    this.isFetching2 = true
    const { error } = await this
      .stripe
      .confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements: this.elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.href}/?success=true&id=${this.intentId}`,
          payment_method_data: {
            billing_details: {
              email: this.email
            }
          }
        }
      })
    if (error) {
      // This point will only be reached if there is an immediate error when confirming the payment. Show error to your
      // customer (for example, payment details incomplete)
      this.isFetching2 = false
      this.error = error.message
      //          console.error(error)

    } else {
      this.registerEvent('donate', 'click')
      this.isFetching2 = false
      this.isFetching = false
      this.showDonationModal = !this.showDonationModal
      this.showNotification = !this.showNotification
      this.success = true
      this.status = 'Payment Confirmed'
      this.details = 'Your donation was correctly received. Thank you for helping us thrive!'

      // Your customer will be redirected to your `return_url`. For some payment methods like iDEAL, your customer will be
      // redirected to an intermediate site first to authorize the payment, then redirected to the `return_url`.
    }
  },

  async setup() {
    this.error = ''
    this.isFetching = !this.isFetching
    await this.loadScript('https://js.stripe.com/v3')
    this.stripe = Stripe(this.stripeKey)
    const data = {
      amount: this.amount,
      currency: this.currency
    }
    const response = await fetch('/api/payment?mode=donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    const clientSecret = json.client_secret
    this.intentId = json.intentId

    const appearance = {
      theme: document
        .documentElement
        .classList
        .contains('dark')
        ? 'night'
        : 'stripe',
      variables: {
        fontFamily: 'Aldrich'
      }
    }
    const options = {
      clientSecret: clientSecret,
      // Fully customizable with appearance API.
      appearance: appearance,
      fonts: [
        {
          family: 'Aldrich',
          src: 'url(/assets/fonts/aldrich/aldrich-v17-latin-regular.ttf)',
          weight: '400',
          display: 'block',
          style: 'normal'
        }
      ]
    }
    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
    this.elements = this
      .stripe
      .elements(options)
    // Create and mount the Payment Element
    const paymentElement = this
      .elements
      .create('payment')
    paymentElement.mount('#payment-element')
    this.showDonationModal = !this.showDonationModal
    this.isFetching = !this.isFetching
  }
})
