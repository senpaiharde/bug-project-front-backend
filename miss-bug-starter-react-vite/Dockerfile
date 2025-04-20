# --- miss-bug-starter-react-vite/Dockerfile ---
# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Vite default output is "dist"; if yours uses "build", adjust below
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.23-alpine
# Remove default content
RUN rm -rf /usr/share/nginx/html/*
# Copy built files from builder
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
