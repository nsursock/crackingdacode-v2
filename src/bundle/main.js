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

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  Alpine.start()
})

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('utils', {
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
})
