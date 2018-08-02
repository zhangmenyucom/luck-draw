import MeScoresService from '@/services/meScoresService'
export default {
  start (e, rangeKey = 'score') {
    global.setInterval = setInterval(() => {
      MeScoresService.getList().then(res => {
        if (res.code === 0) {
          e[rangeKey] = res.data.score
        }
      })
    }, 2000)
  },
  end () {
    clearInterval(global.setInterval)
  }
}
