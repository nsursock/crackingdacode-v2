export default () => ({
  error: '',
  isFetching: false,

  /*validateName() {
    if (!new RegExp('^[a-zA-Z]+( [a-zA-Z]+)+$').test(this.name))
      this.error = 'Your full name is not valid'
    else
      this.error = ''
  },*/
  handleSignup() {
    this.registerEvent('signup', 'click')
    this.isFetching = true
    this.error = ''
    var data = {
      email: this.email,
      name: this.name,
      password: this.password
    }
    fetch('/api/auth?mode=signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((message) => {
        if (!message.success) {
          this.error = message.error
          this.isFetching = false
        }
        else {
          this.showAuthSignupModal = false
          this.showCommentsPanel = true;
          localStorage.setItem('crdacode_token', message.user.token);
          Alpine.store('auth').setUser(message.user)
        }
      })
      .catch((error) => {
        this.error = error
        this.isFetching = false
      })
  },

  handleLogin() {
    this.registerEvent('login', 'click')
    this.isFetching = true
    this.error = ''
    var data = {
      email: this.email,
      password: this.password
    }
    fetch('/api/auth?mode=login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((message) => {
        if (!message.success) {
          this.error = message.error
          this.isFetching = false
        }
        else {
          this.showAuthLoginModal = false
          this.showCommentsPanel = true;
          localStorage.setItem('crdacode_token', message.user.token);
          Alpine.store('auth').setUser(message.user)
        }
      })
      .catch((error) => {
        this.error = error
        this.isFetching = false
      })
  }
})
