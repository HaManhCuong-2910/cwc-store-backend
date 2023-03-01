const redis = require('redis');

const connectRedis = () => {
  const redis = require('redis');

  var client = redis.createClient({
    url: 'redis://default:cf6f83a6b4c0498db6d1fda6c3c33c2d@fly-redis-shoes-shop-db.upstash.io',
  });

  client.ping((err, pong) => {
    if (err) {
      console.log('err', err);
    }
    console.log(pong);
  });
};

export { connectRedis };
