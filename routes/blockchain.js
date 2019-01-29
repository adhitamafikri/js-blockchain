const express = require('express')
const router = express.Router()
const path = require('path')

const bc = require('../src/blockchain')

let blockchain = new bc.Blockchain()

router.get('/', (req, res) => {
  console.log('running blockchain project!')
  res.send(blockchain)
})

router.get('/populate', (req, res) => {
  blockchain = new bc.Blockchain()
  blockchain = bc.populateBlockchain(blockchain)
  console.log(blockchain.checkValidity())

  res.send(blockchain)
})

router.get('/send-transaction', (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'send-transaction.html'))
})

router.post('/send-transaction', (req, res) => {
  console.log(req.body)

  let result = {}  
  req.body.forEach((item) => {
    if(item.name == 'amount') result[item.name] = parseInt(item.value)
    else result[item.name] = item.value
  })
  console.log(result)

  let block = new bc.Block(
    blockchain.latestBlock().index + 1,
    new Date(),
    result,
    blockchain.latestBlock().hash
  )

  blockchain.addBlock(block)
  res.send('Transaction has been sent and added to blockchain !!')
})

router.get('/:id', (req, res) => {
  let block = blockchain.chain[req.params.id]
  res.send(block)
})

module.exports = router
