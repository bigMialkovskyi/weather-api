const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const mailQueue = require('../queues/mailQueue');

const prisma = new PrismaClient();

async function scheduleEmails(frequency) {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      confirmed: true,
      frequency: frequency,
    },
  });

  for (const sub of subscriptions) {
    await mailQueue.add({
      email: sub.email,
      city: sub.city,
      frequency: sub.frequency,
    });
  }
}

cron.schedule('0 * * * *', async () => {
  console.log('🕐 Hourly mailing triggered');
  await scheduleEmails('hourly');
});

cron.schedule('0 7 * * *', async () => {
  console.log('📅 Daily mailing triggered');
  await scheduleEmails('daily');
});