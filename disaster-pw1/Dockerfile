FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

COPY set-env.sh .
RUN chmod +x set-env.sh && sh set-env.sh

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/disaster/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80