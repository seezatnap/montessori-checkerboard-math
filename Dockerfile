FROM node:22-bookworm-slim AS builder

WORKDIR /app
COPY checkerboard.html ./
COPY scripts ./scripts
RUN node scripts/build.mjs

FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs app

COPY --chown=app:nodejs server.js ./
COPY --from=builder --chown=app:nodejs /app/dist ./dist

USER app
EXPOSE 3000

CMD ["node", "server.js"]
