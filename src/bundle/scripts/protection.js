export default () => ({
  isFetching: false,
  error: '',
  login() {
    this.isFetching = true
    this.registerEvent('step2', 'focus')
    this.registerEvent('login', 'click')
    this.error = ''
    var data = {
      email: this.email,
      password: this.password,
    }
    fetch('/api/auth?mode=login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((message) => {
        if (!message.success) {
          this.isFetching = false
          this.error = message.error
        } else {
          localStorage.setItem('crdacode_token', message.user.token)
          Alpine.store('auth').setUser(message.user)
          this.currentStep++
        }
      })
      .catch((error) => {
        this.isFetching = false
        this.error = error
      })
  },
  signup() {
    this.isFetching = true
    this.registerEvent('step2', 'focus')
    this.registerEvent('signup', 'click')
    this.error = ''
    var data = {
      email: this.email,
      name: this.name,
      password: this.password,
    }
    fetch('/api/auth?mode=signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((message) => {
        if (!message.success) {
          this.isFetching = false
          this.error = message.error
        } else {
          localStorage.setItem('crdacode_token', message.user.token)
          Alpine.store('auth').setUser(message.user)
          this.currentStep++
        }
      })
      .catch((error) => {
        this.isFetching = false
        this.error = error
      })
  },

  email: '',
  stripe: null,
  elements: null,
  intentId: '',
  async initStripe() {
    this.isFetching = false
    this.error = ''
    await this.loadScript('https://js.stripe.com/v3')
    this.stripe = Stripe(this.stripeKey)
    const data = {
      protection: this.price,
    }
    const response = await fetch('/api/payment?mode=code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    const clientSecret = json.client_secret
    this.intentId = json.intentId

    const appearance = {
      theme: document.documentElement.classList.contains('dark')
        ? 'night'
        : 'stripe',
      variables: {
        fontFamily: 'Aldrich',
      },
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
          style: 'normal',
        },
      ],
    }
    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
    this.elements = this.stripe.elements(options)
    // Create and mount the Payment Element
    const paymentElement = this.elements.create('payment')
    paymentElement.mount('#payment-element2')
  },
  async pay() {
    this.isFetching = true
    this.registerEvent('step3', 'focus')
    const { error } = await this.stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements: this.elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.href}/?success=true&id=${this.intentId}`,
        payment_method_data: {
          billing_details: {
            //                name: Alpine.store('auth').user.user_name,
            email: Alpine.store('auth').user.email,
          },
        },
      },
    })
    if (error) {
      // This point will only be reached if there is an immediate error when confirming the payment. Show error to your
      // customer (for example, payment details incomplete)
      this.isFetching = false
      this.error = error.message
      //console.error(error)

      const payload = {
        type: error.type,
        code: error.code,
        decline_code: error.decline_code,
        message: error.message,
        log: error.request_log_url,
      }
      fetch('/api/payment?mode=error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

    } else {
      var data = {
        user: Alpine.store('auth').user.email,
        article: window.location.pathname,
      }
      fetch('/api/payment?mode=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((message) => {
          if (!message.success) {
            this.isFetching = false
            this.error = message.error
          } else {
            this.currentStep++
          }
        })
        .catch((error) => {
          this.isFetching = false
          this.error = error
        })
      // Your customer will be redirected to your `return_url`. For some payment methods like iDEAL, your customer will be
      // redirected to an intermediate site first to authorize the payment, then redirected to the `return_url`.
    }
  },
})
