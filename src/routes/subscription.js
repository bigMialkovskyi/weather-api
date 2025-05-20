const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendEmail } = require('../utils/mailer');

// 📨 POST /subscribe — створення підписки
router.post('/subscribe', async (req, res) => {
  const { email, city, frequency } = req.body;

  if (!email || !city || !frequency) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Перевірка, чи вже є така підписка для міста
    const existing = await prisma.subscription.findFirst({
      where: {
        email,
        city,
      },
    });

    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed to this city.' });
    }

    const token = crypto.randomBytes(12).toString('hex');

    const newSub = await prisma.subscription.create({
      data: {
        email,
        city,
        frequency,
        token,
      },
    });

    console.log(`✅ Confirmation email sent to ${email} with token: ${token}`);
    console.log(`🔗 Confirm link: http://localhost:3050/api/confirm/${token}`);
    await sendEmail(
      email,
      'Please confirm your subscription',
      `
        <p>Hello!</p>
        <p>Click the link below to confirm your subscription:</p>
        <p><a href="http://localhost:3050/api/confirm/${token}">Confirm Subscription</a></p>
      `
    );

    res.json({ message: 'Subscription successful. Confirmation email sent.' });
  } catch (error) {
    console.error('❌ Subscription error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ✅ GET /confirm/:token — підтвердження підписки
router.get('/confirm/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { token },
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Token not found.' });
    }

    if (subscription.confirmed) {
      return res.status(200).json({ message: 'Subscription already confirmed.' });
    }

    await prisma.subscription.update({
      where: { token },
      data: { confirmed: true },
    });

    await sendEmail(
      subscription.email,
      'Subscription confirmed!',
      `
        <p>Thank you for confirming your subscription to weather updates.</p>
        <p>If you ever want to unsubscribe, use this link:</p>
        <p><a href="http://localhost:3050/api/unsubscribe/${token}">Unsubscribe</a></p>
      `
    );

    res.json({ message: 'Subscription confirmed successfully.' });
    console.log(`🔗 Unsubscribe link: http://localhost:3050/api/unsubscribe/${token}`);
  } catch (error) {
    console.error('❌ Confirmation error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ❌ GET /unsubscribe/:token — скасування підписки
router.get('/unsubscribe/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const deleted = await prisma.subscription.delete({
      where: { token },
    });

    res.json({ message: `Successfully unsubscribed ${deleted.email}` });
    console.log(`🗑️ Unsubscribed: ${deleted.email}`);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Token not found.' });
    }

    console.error('❌ Unsubscribe error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;