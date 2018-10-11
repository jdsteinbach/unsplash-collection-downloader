require('isomorphic-fetch')
const Unsplash = require('unsplash-js').default
const toJson = require('unsplash-js').toJson
const env = require('node-env-file')
const fs = require('fs')
const request = require('request')

const ENV = env('.env')

const getArg = (flag) => {
  let foundArg = process.argv.find(arg => {
    return arg.indexOf(`--${flag}=`) === 0
  })
  return foundArg ? foundArg.split('=').pop() : false
}

const dir = getArg('dir') || '/Users/james/Pictures/Unsplash'

const collectionID = getArg('c') || ENV.COLLECTION_ID

const pagination = parseInt(getArg('p'), 10) || 25

console.log(pagination)

const downloadImage = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    if (err) {
      console.log(err)
    }
    request(uri)
      .pipe(fs.createWriteStream([dir, filename].join('/')))
      .on('close', callback)
  })
}

const UnsplashCollectionDownloader = () => {
  let unsplash = new Unsplash({
    applicationId: ENV.ACCESS_KEY,
    secret: ENV.SECRET_KEY
  })
  const collectionLength = unsplash
    .collections
    .getCollection(collectionID)
    .then(toJson)
    .then(response => {
      for (let i = 0; (i * pagination) < response.total_photos; i++) {
        let page = i + 1
        unsplash
          .collections
          .getCollectionPhotos(collectionID, page, pagination)
          .then(toJson)
          .then(response => {
            response.map(m => {
              console.log(m.id)
              downloadImage(m.urls.full, `${m.id}.jpg`, () => console.log(`Image "${m.id}" downloaded`))
            })
          })
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  return collectionLength
}

UnsplashCollectionDownloader()

module.export = UnsplashCollectionDownloader
