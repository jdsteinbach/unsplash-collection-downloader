const toJson = require('unsplash-js').toJson

const downloadImage = require('./downloadImage')
const getArg = require('./getArg')

const pagination = parseInt(getArg('p', 25), 10)

const collectionPaginated = (unsplash, collectionID, total_photos) => {
  let total_pages = Math.ceil(total_photos / pagination)

  for (let i = 0; i < total_pages; i++) {
    unsplash
      .collections
      .getCollectionPhotos(collectionID, (i + 1), pagination)
      .then(toJson)
      .then(response => {
        response.map(m => downloadImage(m.urls.full, m.id))
      })
      .catch(err => console.log(err))
  }
}

module.exports = collectionPaginated
