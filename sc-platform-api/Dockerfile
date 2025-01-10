FROM node:22-alpine AS alpine

FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.4.1

FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune --scope=sc-platform-api --docker

FROM base AS builder

WORKDIR /app

COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

RUN yarn install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN npx prisma generate --schema ./sc-platform-api/prisma/schema.prisma
RUN turbo build --filter=sc-platform-api
RUN yarn workspaces focus --all --production

FROM alpine AS runnner

COPY --from=builder /app /app
WORKDIR /app/sc-platform-api

CMD node dist/main
