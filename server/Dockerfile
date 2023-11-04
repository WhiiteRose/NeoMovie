FROM node:18.16.0

WORKDIR /app
COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["yarn", "start"]