const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mediaApi = require('./api/mediaApi')

const app = express()
app.use(morgan('dev'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/media', express.static('media'))
app.use('/api', mediaApi)

const PORT = 4080
app.listen(PORT, () => console.log(`Listen on port: ${PORT}!`))