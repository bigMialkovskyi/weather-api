# 1. Базовий образ
FROM node:18

# 2. Робоча директорія
WORKDIR /app

# 3. Встановлюємо залежності
COPY package*.json ./
RUN npm install

# 4. Копіюємо проєкт
COPY . .

# 5. Генеруємо Prisma клієнт і застосовуємо міграції
RUN npx prisma generate
RUN npx prisma migrate deploy

# 6. Відкриваємо порт
EXPOSE 3050

# 7. Запускаємо продакшн-сервер
COPY wait-for.sh .
RUN chmod +x wait-for.sh
CMD ["./wait-for.sh", "db", "npx", "prisma", "migrate", "deploy"]