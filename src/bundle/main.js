import Alpine from 'alpinejs'
window.Alpine = Alpine

import intersect from '@alpinejs/intersect'
Alpine.plugin(intersect)

import global from './scripts/global.js'
// import form from './form.js'
// import testimonials from './testimonials.js'

Alpine.data('global', global)
// Alpine.data('form', form)
// Alpine.data('testimonials', testimonials)

import { format, formatRelative, formatDistance } from 'date-fns'

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  Alpine.start()
})

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('utils', {
    formatDate(date, dateFormat) {
      if (dateFormat === 'relative') return formatRelative(date, new Date())
      else if (dateFormat === 'distance') return formatDistance(date, new Date(), { addSuffix: true })
      else return format(date, dateFormat)
    },
    isMobile() {
      return this.getDeviceType() === 'Mobile'
    },
    getDeviceType() {
      const screenWidth = window.innerWidth;

      // Define breakpoints
      const mobileMaxWidth = 767;
      const tabletMaxWidth = 1023;

      // Check screen width against breakpoints
      if (screenWidth <= mobileMaxWidth) {
        return 'Mobile';
      } else if (screenWidth <= tabletMaxWidth) {
        return 'Tablet';
      } else {
        return 'Desktop';
      }
    }
  })

  Alpine.store('db', {
    client: null,

    createClient(url, key) {
      this.client = createClient(url, key)
    }
  })

  Alpine.store('auth', {
    user: null,
    setUser(user) {
      this.user = user
    },
    init() {
      this.getLoggedInUser()
    },
    getLoggedInUser() {
      const token = localStorage.getItem('crdacode_token')
      if (token) {
        fetch('/api/auth?mode=me', {
          method: 'POST',
          body: token,
        })
          .then((response) => response.json())
          .then((message) => {
            if (message.success) this.user = message.user
          })
      }
    },
  })
})
