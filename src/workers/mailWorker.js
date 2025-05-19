const mailQueue = require('../queues/mailQueue');
const nodemailer = require('nodemailer');
const axios = require('axios');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

mailQueue.process(async (job, done) => {
  const { email, city, frequency } = job.data;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
        lang: 'ua',
      },
    });

    const weather = response.data.weather[0].description;
    const temp = response.data.main.temp;

    await transporter.sendMail({
      from: `"Weather Bot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🌤️ Погода у ${city} — ${frequency}`,
      text: `Привіт! У місті ${city} зараз ${weather}, температура: ${temp}°C`,
    });

    console.log(`✅ Email sent to ${email} (${frequency})`);
    done();
  } catch (error) {
    console.error('❌ Error in mailWorker:', error);
    done(error);
  }
});