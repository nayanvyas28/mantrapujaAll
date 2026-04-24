# Stage 1: Build the website
# Using node:20-slim for best compatibility with native modules (lightningcss)
FROM node:20-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# IMPORTANT: This Dockerfile is designed for a build context set to /website
# Copy website manifest
COPY package.json ./

# Copy local packages (now moved inside website/packages)
COPY packages ./packages

# Copy the rest of the website source code
COPY . .

# Install dependencies specifically for the website
# Since packages is now internal, the relative path file:./packages/... will resolve
RUN npm install --legacy-peer-deps

# Build the website
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add compatibility layer for Alpine
RUN apk add --no-cache libc6-compat

# Security best practice: don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the website
CMD ["npm", "start"]
