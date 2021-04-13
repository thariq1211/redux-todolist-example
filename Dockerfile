#step 1
FROM node:lts-alpine3.9 as build
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

#step2
FROM httpd:2.4-alpine as tes1
COPY --from=build /app/build/. /usr/local/apache2/htdocs/
