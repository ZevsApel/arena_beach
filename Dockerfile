# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (включая @prisma/client)
RUN npm install

# Копируем Prisma схемы
COPY prisma ./prisma

# Генерируем Prisma клиент
RUN npx prisma generate

# Копируем весь проект
COPY . .

# Собираем проект
RUN npm run build

# Запускаем приложение
CMD ["npm", "run", "start"]