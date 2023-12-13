export default () => ({
  open: false,
  startTime: null,
  currTime: null,
  timer: null,

  selectedQuiz: 0,
  leaders: [],
  alreadyTook: false,

  async leadersFetch() {
    this.leaders = (await (await fetch('/api/quizzes?mode=select')).json()).data || []
  },
  async init() {
    await this.leadersFetch()

    Alpine
      .store('db')
      .createClient(this.supabaseUrl, this.supabaseKey)

    var table = (this.environment).startsWith('dev')
      ? 'rankings.dev'
      : 'rankings'

    var tableUser = (this.environment).startsWith('dev')
      ? 'users.dev'
      : 'users'

    const channel = Alpine
      .store('db')
      .client
      .channel('leader-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: table
      }, async (payload) => {

        let { data, error } = await Alpine
          .store('db')
          .client
          .from(tableUser)
          .select()
          .eq("email", payload.new.player)

        //console.log(data)

        if (error) {
          console.log('ERROR', error.message)
        }

        this
          .leaders
          .push({
            ...payload.new,
            player: data[0]
          })

      })
      .subscribe()

  },

  async hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto
      .subtle
      .digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  },

  start() {
    this.startTime = this.currTime = new Date();
    this.timer = setInterval(() => {
      this.currTime = new Date();
    }, 100);
  },
  stop() {
    clearInterval(this.timer)
  },
  elapsed() {
    //          return this.formatDate(this.time, 'HH:mm:ss')
    return ((this.currTime.getTime() - this.startTime.getTime()) / 1000).toFixed()
  }
})
