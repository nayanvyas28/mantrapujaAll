# This Dockerfile must be built with the repository root as the build context.
FROM node:20-slim AS builder

WORKDIR /app

# Copy root manifest and lockfile
COPY package.json package-lock.json* ./

# Copy workspace manifests
COPY admin-panel/package.json ./admin-panel/
COPY packages ./packages

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY admin-panel ./admin-panel

# Build the app
WORKDIR /app/admin-panel
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app/admin-panel

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/admin-panel/public ./public
COPY --from=builder /app/admin-panel/package.json ./package.json
COPY --from=builder /app/admin-panel/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/admin-panel/.next ./.next

USER nextjs

EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
