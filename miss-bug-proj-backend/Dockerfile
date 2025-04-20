FROM node:18-alpine AS builder
# …install deps, copy code…

FROM node:18-alpine AS runtime
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3030
CMD ["node","server.js"]
