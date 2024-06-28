FROM node:22.3.0
RUN mkdir -p /usr/app
WORKDIR /usr/app
ADD . .
RUN npm i
RUn npm i --save @fortawesome/fontawesome-svg-core
ENTRYPOINT ["node", "index.js"]
