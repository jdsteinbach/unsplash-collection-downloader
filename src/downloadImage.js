const fs = require('fs')
const path = require('path')
const https = require('https')
const getArg = require('./getArg')

const dir = getArg('dir', '.')

const newDownload = f => console.log(`Image downloaded: ${f}`)
const imageExists = f => console.log(`Image exists: ${f}`)

const getImage = (uri, filepath, filename) => {
  const file = fs.createWriteStream(filepath)
  https.get(uri, response => {
      response.pipe(file)
      file.on('finish', () => {
        file.close(newDownload(filename))
      })
    }).on('error', err => {
      fs.unlink(filepath)
      console.log(err.message)
    })
}

const downloadImage = (uri, id) => {
  const filename = `${id}.jpg`
  const filepath = path.join(dir, filename)

  fs.open(filepath, 'r', (err, fd) => {
    if (err && err.code === 'ENOENT') {
      getImage(uri, filepath, filename)
    } else {
      imageExists(filename)
    }
  })
}

module.exports = downloadImage
