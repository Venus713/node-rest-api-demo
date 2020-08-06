FROM node:12.0.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

ENV DB_URI=mongodb+srv://pass0123:2cSl5qyowFccQcde@cluster0.feek4.mongodb.net/test
ENV TEST_DB_URI=mongodb+srv://pass0123:IksWcr10AG18xvOu@cluster0.ocqtj.mongodb.net/test

EXPOSE 8080

CMD [ "npm", "run", "start" ]
