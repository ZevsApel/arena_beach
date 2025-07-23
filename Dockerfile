# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем схему Prisma и генерируем клиент
COPY prisma ./prisma
RUN npx prisma generate

# Копируем весь проект
COPY . .

# Собираем проект
RUN npm run build

# Запускаем приложение
CMD ["npm", "run", "start"]