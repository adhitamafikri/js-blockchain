const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index || 0
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString()
  }

  mineBlock(difficulty) {

  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()]
  }

  createGenesis() {
    return new Block(0, Date.now(), 'Genesis Block', '0')
  }

  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    this.chain.push(newBlock)
  }

  checkValidity() {
    const chainLength = this.chain.length
    for(let i = 1; i < chainLength; i++) {
      let currentBlock = this.chain[i]
      let previousBlock = this.chain[i - 1]

      if(currentBlock.previousHash !== previousBlock.hash) return 'Blockchain is not valid! Some blocks has an invalid reference of previousHash'
    }
    return 'Blockchain is valid!'
  }
}

// populate blockchain with blocks
function populateBlockchain(blockchain) {
  for(let i = 0; i < 5; i++) {
    let latestBlock = blockchain.latestBlock()

    let blockData = {
      source    : 'SCFEETERTERTERTER',
      amount    : 24,
      memo      : `Transaction #${latestBlock.index + 1}`
    }

    let block = new Block(latestBlock.index + 1, Date.now(), blockData, latestBlock.hash)
    
    blockchain.addBlock(block)
  }
  return blockchain
}

export { Block, Blockchain, populateBlockchain }
