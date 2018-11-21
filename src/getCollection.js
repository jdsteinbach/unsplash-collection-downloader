const toJson = require('unsplash-js').toJson

const getArg = require('./getArg')
const collectionPaginated = require('./collectionPaginated')

// User parameters
const pagination = parseInt(getArg('p', 25), 10)

const getCollection = (unsplash, collectionID) => {
  const collectionLength = unsplash
    .collections
    .getCollection(collectionID)
    .then(toJson)
    .then(response => {
      collectionPaginated(unsplash, collectionID, response.total_photos)
    })
    .catch(err => console.log(err))
  return collectionLength
}

module.exports = getCollection
