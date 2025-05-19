# ☀️ Weather API

Це API-сервіс для отримання погодних даних і надсилання email-повідомлень. Побудований на основі Node.js, Express, PostgreSQL та Prisma. Підтримує запуск у Docker та готовий до продакшн-деплою.

---

## 🔧 Основний функціонал

- Отримання поточної погоди через зовнішнє API
- Збереження даних у PostgreSQL
- Надсилання листів через SMTP (Gmail)
- Підтримка змінних середовища через `.env`
- Docker-інфраструктура для швидкого запуску

---

## 🚀 Запуск локально

### ✅ Передумови

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 🔧 Кроки

1. Клонуй репозиторій

```bash
git clone https://github.com/your-username/weather-api.git
cd weather-api
```

2. Створи файл `.env`

```bash
cp .env.example .env
```

3. Заповни файл `.env` своїми значеннями (приклад нижче)

4. Запусти проєкт через Docker Compose

```bash
docker compose up --build -d
```

5. Перевір API у браузері:

```
http://localhost:3050
```

Або перевір логи:

```bash
docker compose logs -f api
```

---

## 🌐 Деплой на VPS

1. Склонуй репозиторій або завантаж код на сервер:

```bash
git clone https://github.com/your-username/weather-api.git
cd weather-api
```

2. Переконайся, що на сервері встановлено Docker і Docker Compose

3. Створи `.env` файл з актуальними налаштуваннями

4. Запусти додаток:

```bash
docker compose up --build -d
```

---

## 🔑 Як отримати API-ключі

### 🟦 WEATHER_API_KEY

Щоб отримати API-ключ для погоди:

1. Перейдіть на сайт: [https://openweathermap.org/api](https://openweathermap.org/api)
2. Зареєструйтесь або увійдіть
3. В особистому кабінеті відкрийте вкладку **API keys**
4. Натисніть **"Generate"** для створення нового ключа
5. Скопіюйте ключ і вставте у `.env` у поле `WEATHER_API_KEY`

---

### 📧 EMAIL_PASS (Gmail App Password)

Google блокує звичайний пароль у сторонніх додатках. Для надсилання листів із Gmail потрібно створити **App Password**:

1. Перейдіть до [Google Account Security](https://myaccount.google.com/security)
2. Увімкніть **2-Step Verification** (обов’язково)
3. Після активації 2FA перейдіть до: [App Passwords](https://myaccount.google.com/apppasswords)
4. Оберіть "Mail" і "Other", назвіть як хочете (наприклад, "Weather API")
5. Скопіюйте згенерований пароль — він виглядатиме як `abcd efgh ijkl mnop`
6. Вставте його у `.env` як значення для `EMAIL_PASS`


🔗 **Живий приклад**:  
https://white2025white.space/

## 📦 Стек технологій

- Node.js 18
- Express.js
- PostgreSQL + Prisma
- Nodemailer (SMTP)
- OpenWeatherMap API
- Docker + Docker Compose

---

## 👤 Автор

**Владислав Малковський**  
📧 vladmalkovskij99@gmail.com

---