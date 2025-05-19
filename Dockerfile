FROM node:18

# Робоча директорія всередині контейнера
WORKDIR /app

# Копіюємо файли package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо весь код
COPY . .

# Додаємо скрипт очікування запуску бази
COPY wait-for.sh .
RUN chmod +x wait-for.sh

# Відкриваємо порт
EXPOSE 3050

# Команда за замовчуванням
CMD ["npm", "run", "start"]