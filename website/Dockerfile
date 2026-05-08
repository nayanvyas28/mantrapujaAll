# Stage 1: Build the website
FROM node:20-slim AS builder

WORKDIR /app

# Copy website manifest and packages
COPY package.json ./
COPY packages ./packages
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the website
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

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

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the website
CMD ["npm", "start"]
