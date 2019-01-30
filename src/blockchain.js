import path from 'path'
import * as bc from './classes/Blockchain'
import { reqBodyJSON } from './helpers'

let blockchain = new bc.Blockchain()

export const viewBlockchain = (req, res) => {
  res.send(blockchain)
}

export const viewBlock = (req, res) => {
  res.send(blockchain.chain[req.params.id])
}

export const populateBlockchain = (req, res) => {
  blockchain = new bc.Blockchain()
  blockchain = bc.populateBlockchain(blockchain)
  console.log(blockchain.checkValidity())

  res.send(blockchain)
}

export const getSubmitTransaction = (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'send-transaction.html'))
}

export const postSubmitTransaction = (req, res) => {
  let result = reqBodyJSON(req.body)

  let block = new bc.Block(
    blockchain.latestBlock().index + 1,
    Date.now(),
    result,
    blockchain.latestBlock().hash
  )

  blockchain.addBlock(block)
  res.send('Transaction has been sent and added to blockchain !!')
}

export const getTamperForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'tamper-form.html'))
}

export const postTamperForm = (req, res) => {
  let result = reqBodyJSON(req.body)

  let block = blockchain.chain[result.block_id]
  console.log(block)
  block.data.memo = result.memo
  block.hash = block.calculateHash()
  console.log(block)

  res.send('Tampered a block!!')
}

export const validateBlockchain = (req, res) => {
  res.send(blockchain.checkValidity())
}
