const Queue = require('bull');
const mailQueue = new Queue('mailQueue', {
  redis: { port: 6379, host: '127.0.0.1' }, // або дані від твого Redis
});

module.exports = mailQueue;