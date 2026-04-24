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

# Copy necessary workspaces for dependency resolution
COPY website ./website
# Create dummy folders for other workspaces so npm install doesn't fail
RUN mkdir -p admin-panel backend

# Install dependencies from the root
RUN npm install --legacy-peer-deps

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
