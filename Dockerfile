# Stage 1: Build the website
FROM node:20-slim AS builder

WORKDIR /app

# Copy root manifest and lockfile
COPY package.json package-lock.json* ./

# Copy all workspace manifests for dependency resolution
COPY website/package.json ./website/
COPY admin-panel/package.json ./admin-panel/
COPY backend/package.json ./backend/
COPY packages ./packages

# Install dependencies from the root
RUN npm install --legacy-peer-deps

# Now copy the rest of the source
COPY website ./website

# Build the website
WORKDIR /app/website
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app/website

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/website/public ./public
COPY --from=builder /app/website/package.json ./package.json
COPY --from=builder /app/website/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/website/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
