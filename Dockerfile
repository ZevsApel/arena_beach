# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Настройка npm и защита от обрывов сети
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config delete proxy || true \
    && npm config delete https-proxy || true \
    && npm config delete http-proxy || true

# Устанавливаем зависимости (включая @prisma/client)
# --no-audit и --no-fund уменьшают количество внешних запросов к npm
RUN npm install --no-audit --no-fund || npm install --no-audit --no-fund

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