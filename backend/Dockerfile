FROM node:18-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости (включая dev для сборки)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем TypeScript
RUN npm run build

# Экспортируем порт
EXPOSE 4000

# Запускаем в режиме разработки с перезагрузкой
CMD ["npm", "run", "dev"]