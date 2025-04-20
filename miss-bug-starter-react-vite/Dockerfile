# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy only what you need for build
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:1.23-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
