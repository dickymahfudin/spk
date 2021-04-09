FROM node:14.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm i -g sequelize-cli
COPY . /usr/src/app
CMD ["node", "index.js"]
