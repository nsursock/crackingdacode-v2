export default () => ({

  // For protection modal
  paymentMade: false,
  currentStep: 1,
  discount: 35,
  threshold: 30,
  processFinished: false,
  isChecking: true,

  // For toggling panels and modals
  showCommentsPanel: false,
  showSharingModal: false,
  showDonationModal: false,

  // For scrolling detection
  landingPageOffset: 400,
  lastScrollTop: window.scrollY || document.documentElement.scrollTop,
  isScrollingUp: false,
  // prevPercent: 0,
  percent: 0,
  circumference: 30 * 2 * Math.PI,
  currStep: [],

  // For notifications handling
  showNotification: false,
  success: false,
  status: '',
  details: '',

  // For auth management
  showAuthLoginModal: false,
  showAuthSignupModal: false,
  email: '',
  name: '',
  password: '',

  getImageUrl(featured, device) {
    const dims = []
    if (device === 'mobile') {
      dims.push('w_480/h_275', '&w=480&h=320')
    } else if (device === 'desktop') {
      dims.push('w_1050/h_600', '&w=1080&h=720')
    }

    if (featured.includes('cloudinary')) {
      return featured.replace('/upload/', `/upload/${dims[0]}/f_webp/`);
    } else if (featured.includes('hero')) {
      return featured;
    } else {
      return featured + dims[1];
    }
  },

  replaceImages(el) {
    // Get all paragraphs containing images
    const imageParagraphs = Array.from(el.querySelectorAll('p > img'));

    imageParagraphs.forEach((imgElement) => {
      const imgSrc = imgElement.getAttribute('src');
      const imgAlt = imgElement.getAttribute('alt');

      // Get the sibling em element
      const emElement = imgElement.nextElementSibling;

      if (emElement && emElement.tagName.toLowerCase() === 'em') {
        const caption = emElement.innerHTML.trim();

        // Replace the image and its parent p with the reconstructed HTML
        const reconstructedHTML = `
          <figure class="w-full">
            <img x-intersect="$el.src = $el.dataset.src" class="rounded-lg" 
              alt="${imgAlt}" data-src="${imgSrc}&w=480&h=320">
            <figcaption class="text-center">${caption}</figcaption>
          </figure>
        `;

        // Replace the old image and its parent p with the reconstructed HTML
        imgElement.parentNode.outerHTML = reconstructedHTML;
      } else {
        // Replace the image and its parent p with the reconstructed HTML
        const reconstructedHTML = `
          <figure class="w-full">
            <img x-intersect="$el.src = $el.dataset.src" class="rounded-lg" 
              alt="${imgAlt}" :width="$store.utils.isMobile() ? 480 : 700" 
              :height="$store.utils.isMobile() ? 275 : 400"
              data-src="${imgSrc.replace('w_480/h_275',
          `${Alpine.store('utils').isMobile() ? 'w_480/h_275' : 'w_700/h_400'}`)}">
            <figcaption class="text-center">${imgAlt}</figcaption>
          </figure>
        `;

        // Replace the old image and its parent p with the reconstructed HTML
        imgElement.parentNode.outerHTML = reconstructedHTML;
      }
    });
  },

  loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s
      s = document.createElement('script')
      s.src = src
      s.onload = resolve
      s.onerror = reject
      if (document.body == null) {
        document
          .head
          .appendChild(s)
      } else {
        document
          .body
          .appendChild(s)
      }
    })
  },

  registerEvent(label, type) {
    // if (process.env.NODE_ENV.startsWith('prod')) {
    // if (typeof umami !== 'undefined') {
    // umami.track(label, type);
    let oneWord = type[0].toUpperCase() + type.slice(1, type.length) + 'ed ' +
      label[0].toUpperCase() + label.slice(1, label.length)
    // track(oneWord);
    // mixpanel.track(oneWord)
    // gtag('event', label + '_' + type)
    console.log(oneWord)
    typeof splitbee !== 'undefined' && splitbee.track(oneWord)
    // plausible(label[0].toUpperCase() + label.slice(1, label.length))
    // {
    //   'app_name': 'myAppName',
    //   'screen_name': 'Home'
    // });
    // }
  },

  // Function to check if a URL contains 'posts' followed by something
  containsPosts(url) {
    // Define a regular expression pattern
    var pattern = /posts\/.+/;

    // Test the URL against the pattern
    return pattern.test(url);
  },

  splitHeadlineBalanced(headline) {
    const words = headline.split(' ');
    const totalWords = words.length;

    if (totalWords < 2) {
      return [headline]; // Can't split if there are less than 2 words
    }

    const middle = Math.ceil(totalWords / 2);
    const firstPart = words.slice(0, middle).join(' ');
    const secondPart = words.slice(middle).join(' ');

    return [firstPart.replace(/"/g, ''), secondPart.replace(/"/g, '')];
  },

  async checkPermission(postsDirectory, codeArticle) {
    const isAuthenticated = Alpine.store('auth').user

    const res = await fetch('/api/payment?mode=check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: Alpine.store('auth').user?.email,
        article: window.location.pathname,
        url: `/${postsDirectory}/${codeArticle}/`
      }),
    })
    const json = await res.json()
    const isAuthorized = json.data.length !== 0
    this.isChecking = false
    return isAuthenticated && isAuthorized
  },

  async init() {

    window.addEventListener('scroll', () => {

      // this.prevPercent = this.percent
      var st = window.scrollY || document.documentElement.scrollTop
      this.isScrollingUp = st <= this.lastScrollTop
      this.lastScrollTop = st <= 0 ? 0 : st // for mobile or negative scrolling

      const articleElement = document.querySelector('#article');
      if (!articleElement) return;

      const articleHeight = articleElement.offsetHeight;
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const percentage = (scrollPosition / articleHeight) * 100;

      this.percent = Math.round(percentage);
      // console.log(`User has read ${percentage.toFixed(2)}% of the article`);

      const updateStep = (step, label) => {
        if (
          this.percent >= step.start &&
          this.percent < step.end &&
          !this.currStep.includes(label)
        ) {
          this.currStep.push(label);
          this.registerEvent(`${step.start}%`, 'scroll');
        }
      };

      const steps = [
        // { start: 0, end: 25 },
        { start: 25, end: 50 },
        { start: 50, end: 75 },
        { start: 75, end: 100 },
      ];

      steps.forEach(step => updateStep(step, `${step.start}`));

      if (this.percent === 100 && !this.currStep.includes('100')) {
        this.currStep.push('100');
        this.registerEvent('100%', 'scroll');
      }
    });
  }
});
