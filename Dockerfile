FROM arm32v7/node:12-alpine as build-step
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM arm32v7/nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/OdysseyFrontend /usr/share/nginx/html 