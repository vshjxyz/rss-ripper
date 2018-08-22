import bayes from 'bayes'
import readStream from './streams/read.stream'

const classifier = bayes()

export default (text) => {
  readStream
  .do(item => {
    const term = item.value.title || item.value.content
    if (!term) {
      return console.error(`No value for item ${JSON.stringify(item, null, 2)}`)
    }
    classifier.learn(item.value.title || item.value.content, item.value.label)
  })
  .subscribe(
    () => {},
    (err) => console.error(err),
    () => {
      console.log(classifier.categorize(text))
    }
  )
}
