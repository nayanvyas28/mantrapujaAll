# Stage 1: Build the website
FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root manifest and lockfile
COPY package.json package-lock.json* ./

# Copy local packages (MUST be copied for workspaces to resolve)
COPY packages ./packages

# Copy the target application
COPY website ./website

# Install dependencies from the root
RUN npm install --legacy-peer-deps

# Build the website using the workspace command
WORKDIR /app/website
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app/website

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add compatibility layer for Alpine
RUN apk add --no-cache libc6-compat

# Security best practice: don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build artifacts AND required node_modules from the builder stage
COPY --from=builder /app/website/public ./public
COPY --from=builder /app/website/package.json ./package.json
COPY --from=builder /app/website/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/website/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the website
CMD ["npm", "start"]
