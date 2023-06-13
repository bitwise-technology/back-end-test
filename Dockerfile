FROM node:18.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 5432
CMD [ "npm", "run", "start" ]
