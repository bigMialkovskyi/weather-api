FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y netcat

COPY . .

COPY wait-for.sh .
RUN chmod +x wait-for.sh

EXPOSE 3050

CMD ["./wait-for.sh", "db:5432", "--", "npm", "run", "start"]