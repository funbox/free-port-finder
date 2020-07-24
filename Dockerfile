FROM ubuntu:latest

USER root
WORKDIR /home/app
COPY ./package.json /home/app/package.json
COPY ./index.js /home/app/index.js
COPY ./test.js /home/app/test.js

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs
RUN npm install
RUN npm test
