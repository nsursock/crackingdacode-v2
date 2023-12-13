export default () => ({

  isFetching: false,

  tab: 'comments',
  comments: '',
  sortedItems: [],
  count: 0,

  sortItems(dir) {
    this
      .sortedItems
      .sort((a, b) => (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * (
        dir === 'oldest'
          ? 1
          : -1))
  },
  async getItems() {
    const res = await fetch(`/api/comments?mode=select`, {
      method: 'POST',
      body: window.location.pathname
    })
    this.sortedItems = (await res.json()).data || []
    this.sortItems('newest')
    this.count = this.sortedItems.length
  },
  init() {
    this.getItems()
  },
  submit() {
    this.isFetching = true
    var data = {
      author: Alpine
        .store('auth')
        .user
        .email,
      article: window.location.pathname,
      content: this.comments
    }
    fetch('/api/comments?mode=add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((message) => {
        if (!message.success) {
          this.status = 'Failed to comment on article'
          this.details = message.reason
          this.success = false
        } else {
          this.status = 'Succeeded'
          this.details = 'Your comment was correctly posted!'
          this.success = true
          this.comments = ''

          this.getItems()
          this.$refs.sortdir.selectedIndex = 0

          this.registerEvent('comment', 'click')
        }
        this.isFetching = false
        this.showNotification = true
      })
      .catch((error) => {
        this.status = 'Failed to comment on article'
        this.details = message.reason
        this.success = false
        this.isFetching = false
      })

  }
})
