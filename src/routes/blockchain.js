import express from 'express'
const router = express.Router()

import {
  viewBlockchain,
  viewBlock,
  populateBlockchain,
  getSubmitTransaction,
  postSubmitTransaction,
  getTamperForm,
  postTamperForm,
  validateBlockchain
} from '../blockchain'

router.get('/', viewBlockchain)
router.get('/populate', populateBlockchain)
router.get('/send-transaction', getSubmitTransaction)
router.post('/send-transaction', postSubmitTransaction)
router.get('/tamper', getTamperForm)
router.post('/tamper', postTamperForm)
router.get('/validate', validateBlockchain)

router.get('/:id', viewBlock)

const blockchainRoute = router
export default blockchainRoute
