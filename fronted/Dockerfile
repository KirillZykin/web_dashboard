# Этап 1: Сборка React-приложения
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения
COPY . .

# Сборка приложения
RUN npm run build

FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
