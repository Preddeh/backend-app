const { default: axios } = require('axios');
const redis = require('redis');
const client = redis.createClient(
  process.env.REDIS_PORT, 
  process.env.REDIS_HOST, {
  connect_timeout: 60000
  });

const setData = async (url, expiresIn) => {
  let cached = await client.get(url);
  if (cached == null) {
    cached = JSON.stringify(await (await axios.get(url)).data);
    await client.setex(url, expiresIn, cached);
  }
  return JSON.parse(cached);
};

const connectRedis = async () => {
  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log('Redis client connected');
      resolve();
    });
    client.on('error', (err) => {
      console.error('Redis connection error', err);
      reject(err);
    });
  });
};

module.exports = {
  connectRedis,
  setData,
  client,
};

