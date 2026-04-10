# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root package files and ALL package.json files for workspaces
COPY package.json package-lock.json ./
COPY website/package.json ./website/
COPY admin-panel/package.json ./admin-panel/
COPY backend/package.json ./backend/
COPY mobile-app/package.json ./mobile-app/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies for all workspaces
RUN npm ci

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Build the website workspace
RUN npm run build -w website

# Stage 3: Production server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files for the runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Website specific build artifacts
COPY --from=builder /app/website/public ./website/public
COPY --from=builder /app/website/package.json ./website/package.json
COPY --from=builder --chown=nextjs:nodejs /app/website/.next ./website/.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Target the website workspace for the start command
CMD ["npm", "run", "start", "-w", "website"]
