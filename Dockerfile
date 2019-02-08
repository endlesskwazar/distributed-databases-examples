FROM node:8

# Створення директорії застосунка
WORKDIR /usr/src/app

# Встановлення залежностей
COPY package*.json ./

RUN npm install
# Якщо будуємо на прод
# RUN npm install --only=production

# Копіювання джерельного коду в контейнер
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]