require('isomorphic-fetch')
const Unsplash = require('unsplash-js').default
const env = require('node-env-file')

const getArg = require('./src/getArg')
const getCollection = require('./src/getCollection')

// Secret keys from .env
const ENV = env('.env')

// User parameters
const collectionID = getArg('c', ENV.COLLECTION_ID)

// Unsplash instance
const unsplash = new Unsplash({
  applicationId: ENV.ACCESS_KEY,
  secret: ENV.SECRET_KEY
})

const UnsplashCollectionDownloader = () => {
  getCollection(unsplash, collectionID)
}

module.exports = UnsplashCollectionDownloader
