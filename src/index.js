
// імпорти бібліотек та модулів
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weather');
const subscriptionRoutes = require('./routes/subscription');
const { PrismaClient } = require('@prisma/client');
const express = require('express');

require('dotenv').config();
require('./jobs/mailer');
require('./workers/mailWorker');

// ініціалізація аплікейшна, визначаємо порт
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const prisma = new PrismaClient();

// підключаємо до додатку парсери
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// визначаємо роути
app.use('/api', weatherRoutes);
app.use('/api', subscriptionRoutes);

// запоскаємо прослуховування визначеного порту нашим додатком
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});