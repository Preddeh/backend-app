const express = require('express');
const router = express.Router();
const {
  getBlockHeight,
  getCirculatingSupply,
  getHashes,
  getInfo,
  getStats,
  getTransactions,
} = require('../controllers/link');

router.get('/:link/block/hash/:hash/page/:page', getHashes);
router.get('/:link/block/height/:height', getBlockHeight);
router.get('/:link/getchaintxstats/:interval', getStats);
router.get('/:link/:type/info', getInfo);
router.get('/:link/circulatingsupply', getCirculatingSupply);
router.post('/:link/gettransactions', getTransactions);
module.exports = router;
