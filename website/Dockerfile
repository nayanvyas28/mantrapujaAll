# Stage 1: Build the website
FROM node:20-alpine AS builder

# Add build dependencies for native modules (like lightningcss)
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy root manifest and lockfile
# Note: These paths are relative to the Docker build context. 
# We assume the build context is set to the REPO ROOT (.), not the /website folder.
COPY package.json package-lock.json* ./

# Copy local packages (MUST be copied for workspaces to resolve)
COPY packages ./packages

# Copy the target application
COPY website ./website

# Install dependencies from the root to correctly handle workspaces and protocols
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

# Security best practice: don't run as root
RUN apk add --no-cache libc6-compat
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
