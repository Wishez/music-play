const fs = require('fs')
const router = require('express').Router()
const multer = require('multer')

router.get('/audio-list', (req, res) => {
  const mediaList = fs.readdirSync('./media', { encoding: 'utf-8' })
  
  res.json({
    mediaList: mediaList.map((fileName, index) => {
      const [name, extention] = fileName.split('.')
      return {
        fileName: fileName,
        order: index+1,
        extention: `.${extention}`,
        url: `http://localhost:4080/media/${fileName}`,
        name,
      }
    }),
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './media')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  let shouldUploadFile = false
  if (file.mimetype === 'audio/mp3') {
    shouldUploadFile = true
  }

  cb(null, shouldUploadFile)
}
const upload = multer({
  storage,
  fileFilter,
})

router.post('/media/upload', upload.single('file'), (req, res) => {
  res.status(202).end()
})

router.delete('/media', (req, res) => {
  fs.unlinkSync(req.body.filePath)
  res.end()
})

module.exports = router
