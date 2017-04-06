import URLS from './constants/urls'
import SHARED from './constants/shared'
import bufaleNetTransformer from './transformers/bufale-net'
import RssRipper from '../../src/rss-ripper'
import Rx from 'rxjs'

export default () => {
  let mainStream = Rx.Observable.empty()
  const bufaleNetRipper = new RssRipper(bufaleNetTransformer)

  for (let i = 0; i < SHARED.PAGES; i++) {
    // We concatenate every page stream one after the other, adding a delay between one call and the next one
    mainStream = mainStream.concat(
      Rx.Observable.of(i)
        .delay(SHARED.DELAY)
        .flatMap(() => bufaleNetRipper.rip(URLS.buildBufaleNetUrl(i)))
    )
  }

  mainStream.subscribe(([url, id, item]) => {
    console.log(`(Page ${url}) - ripped item with ID ${id}`)
  }, (err) => {
    console.error('errrror', err)
  })
}
