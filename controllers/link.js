const { default: axios } = require('axios');
const asyncWrapper = require('../utils/asyncWrapper');
const { setData, client } = require('../utils/redis');

const getHashes = asyncWrapper(async (req, res) => {
  const { link, hash, page } = req.params;
  const url = `https://${link}/block/hash/${hash}/page/${page}`;
  const cacheData = await setData(url, 5);
  return res.json(cacheData);
});
const getBlockHeight = asyncWrapper(async (req, res) => {
  const { link, height } = req.params;
  const url = `https://${link}/block/height/${height}`;
  const cacheData = await setData(url, 5);
  return res.json(cacheData);
});

const getStats = asyncWrapper(async (req, res) => {
  const { link, interval } = req.params;
  const url = `https://${link}/getchaintxstats/${interval}`;
  const cacheData = await setData(url, 60 * 60 * 12);
  return res.json(cacheData);
});
const getInfo = asyncWrapper(async (req, res) => {
  const { link, type } = req.params;

  const url = `https://${link}/${type}/info`;
  const cacheData = await setData(url, 5);
  return res.json(cacheData);
});

const getCirculatingSupply = asyncWrapper(async (req, res) => {
  const { link } = req.params;
  const url = `https://${link}/circulatingsupply`;
  const cacheData = await setData(url, 60 * 5);
  return res.json(cacheData);
});

// const getTransactions = asyncWrapper(async (req, res) => {
//   const { link } = req.params;
//   console.log(req.body);
//   const url = `https://${link}/gettransactions`;
//   const { data } = await axios.post(url, req.body);

//   return res.json(data);
// });
const getTransactions = asyncWrapper(async (req, res) => {
  // const t0 = new Date();
  const { link } = req.params;

  const url = `https://${link}/gettransactions`;
  const cacheKey = `transaction:${JSON.stringify(req.body.txids)}`;
  let cached = await client.get(cacheKey);
  if (cached == null) {
    const { data } = await axios.post(url, req.body);
    cached = JSON.stringify(data);
    await client.setEx(cacheKey, 60 * 60, cached);
  }
  // const t1 = new Date();
  // console.log(`${t1 - t0}ms`);
  return res.json(JSON.parse(cached));
});

module.exports = {
  getBlockHeight,
  getCirculatingSupply,
  getInfo,
  getHashes,
  getStats,
  getTransactions,
};
