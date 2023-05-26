# Estágio de compilação
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm install -g @angular/cli && yarn && npm install && npm run build

# Estágio de produção
FROM nginx:1.25.0-alpine

RUN rm /usr/share/nginx/html/index.html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/link_os /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
