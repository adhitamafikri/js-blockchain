const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const blockchainRoute = require('./routes/blockchain')

app.use('/public', express.static(path.join(__dirname, '/static')))
app.use(bodyParser.json())
app.use('/bc', blockchainRoute)

app.listen('3000')
