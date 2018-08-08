import MeScoresService from '../services/meScoresService'
let score = 0

const getMeScores = () => {
  MeScoresService.getList().then(res => {
    if (res.code === 0) {
      if (res.data.score !== score) {
        worker.postMessage({
          score: '32432'
        })
      }
    }
  })
}
// getMeScores()
// const getMeScores = () => {
//   console.log('111')
// }

// worker.onMessage(res => {
//   score = res.score
// })

setInterval(getMeScores, 1000)
