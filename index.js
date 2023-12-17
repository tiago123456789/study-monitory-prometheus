const Redis = require('ioredis');

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis();

function start() {
  for (let index = 0; index < 100000; index += 1) {
    redis.set(`key_${index}`, index);
  }
  console.log('Finished');
  process.exit();
}

start();
