import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import blockchainRoute from './routes/blockchain'
const app = express()

app.use('/public', express.static(path.join(__dirname, '/static')))
app.use(bodyParser.json())

app.use('/bc', blockchainRoute)

app.listen('3000')
