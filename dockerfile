ARG NODE_VERSION=20.14.0-alpine

FROM node:${NODE_VERSION} AS pre-builder
WORKDIR /app
COPY . .
RUN npm install

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=pre-builder /app .
RUN npm run build

FROM node:${NODE_VERSION} AS pre-prod
WORKDIR /app
RUN touch swagger.json
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

FROM node:${NODE_VERSION} AS production
RUN apk add tzdata zip --no-cache && \
    cp /usr/share/zoneinfo/America/Bogota /etc/localtime

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=pre-prod  /app/node_modules ./node_modules
COPY --from=pre-prod  /app/package*.json ./
COPY --from=pre-prod  /app/swagger.json ./swagger.json

ENTRYPOINT npm run start:dev