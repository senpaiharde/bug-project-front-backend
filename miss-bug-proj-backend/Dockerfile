# Use a single stage for clarity
FROM node:18-alpine
WORKDIR /usr/src/app

# 1) Install prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# 2) Copy code
COPY . .

# 3) Expose & run
EXPOSE 3030
CMD ["node", "server.js"]
