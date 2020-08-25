const album = new Vue({
  el: '#album',
  data: {
    loaded: false,
    files: []
  },
  async created() {
    const { bucketId, prefix } = this.params
    this.files = await fetch(
      `/api/album?bucketId=${bucketId}&prefix=${prefix}`
    ).then(r => r.json())
    this.loaded = true
  },
  computed: {
    params() {
      const search = location.search.substring(1)
      return JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value)
        }
      )
    }
  }
})
