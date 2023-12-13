import Alpine from 'alpinejs'
window.Alpine = Alpine

import intersect from '@alpinejs/intersect'
Alpine.plugin(intersect)

import global from './scripts/global.js'
import form from './scripts/form.js'
import cta from './scripts/cta.js'
import comments from './scripts/comments.js'
import auth from './scripts/auth.js'
import protection from './scripts/protection.js'
// import testimonials from './testimonials.js'

Alpine.data('global', global)
Alpine.data('form', form)
Alpine.data('cta', cta)
Alpine.data('comments', comments)
Alpine.data('auth', auth)
Alpine.data('protection', protection)
// Alpine.data('testimonials', testimonials)

Alpine.directive(
  'else',
  (el, { expression, modifiers }, { evaluateLater, cleanup }) => {
    const previous = el.previousElementSibling

    if (!previous || previous.tagName.toLowerCase() !== 'template' || !previous.hasAttribute('x-if')) {
      throw new Error('`x-else` encountered without a previous `x-if` sibling.')
    }

    el.setAttribute('x-if', `! (${previous.getAttribute('x-if')})`)
  }
)

import { format, formatRelative, formatDistance } from 'date-fns'

function combineRandomly(str1, str2) {
  // Convert strings to arrays of characters
  const arr1 = str1.split('');
  const arr2 = str2.split('');

  // Combine arrays randomly
  const combinedArray = [];
  while (arr1.length > 0 || arr2.length > 0) {
    // Randomly choose between str1 and str2
    const chooseFromFirst = Math.random() < 0.5;

    if (chooseFromFirst && arr1.length > 0) {
      combinedArray.push(arr1.shift());
    } else if (arr2.length > 0) {
      combinedArray.push(arr2.shift());
    }
  }

  // Convert the combined array back to a string
  const combinedString = combinedArray.join('');

  return combinedString;
}

function generateUniqueID() {
  // Create a timestamp (milliseconds since the Unix epoch)
  const timestamp = new Date().getTime();

  // Generate a random number (between 0 and 1) and convert it to a string
  const random = Math.random().toString(36).substring(2);

  // Combine the timestamp and random number to create a unique ID
  const uniqueID = combineRandomly(timestamp.toString(), random.toString())
  // console.log(uniqueID);

  return uniqueID;
}

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes('InternalTraffic')) {
    localStorage.setItem('crdacode_InternalTraffic', 'true')
  }

  // Check if the unique user ID is in local storage
  const uniqueID = localStorage.getItem('crdacode_UniqueUserID');
  if (!uniqueID) { // new user
    localStorage.setItem('crdacode_UniqueUserID', generateUniqueID());
  }

  Alpine.start()
});

import { createClient } from '@supabase/supabase-js'

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
