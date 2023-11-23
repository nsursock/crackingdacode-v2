export default () => ({

  // Scrolling detector
  landingPageOffset: 400,
  lastScrollTop: window.scrollY || document.documentElement.scrollTop,
  isScrollingUp: false,
  prevPercent: 0,
  percent: 0,
  circumference: 30 * 2 * Math.PI,
  currStep: [],

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
    // plausible(label[0].toUpperCase() + label.slice(1, label.length))
    // {
    //   'app_name': 'myAppName',
    //   'screen_name': 'Home'
    // });
    // }
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

  async init() {
    const articleElement = document.querySelector('#article');

    if (!articleElement) return;

    window.addEventListener('scroll', () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const percentage = (scrollPosition / documentHeight) * 100;

      this.percent = Math.round(percentage);

      // console.log(`User has read ${this.percent.toFixed(2)}% of the article`);

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
