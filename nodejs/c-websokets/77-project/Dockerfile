FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .

COPY controllers/* ./controllers/
COPY services/* ./services/
COPY schemas/* ./schemas/
COPY routes/* ./routes/
COPY views/* ./views/
COPY .env ./
COPY server.js ./

EXPOSE 3002

CMD [ "node", "server.js" ];