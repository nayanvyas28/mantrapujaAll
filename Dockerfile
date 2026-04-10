# Stage 1: Build the website
FROM node:20-alpine AS builder

WORKDIR /app

# IMPORTANT: We only copy the website folder to keep other folders safe.
# This ensures that the build for the website is isolated from the rest of the monorepo.
COPY website ./website

# Treat the website as a standalone application
WORKDIR /app/website

# We use npm install instead of npm ci to ignore any out-of-sync root lock file.
# The server will generate its own fresh dependency tree.
RUN npm install --legacy-peer-deps

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app/website

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Security best practice: don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build artifacts AND required node_modules
COPY --from=builder /app/website/public ./public
COPY --from=builder /app/website/package.json ./package.json
COPY --from=builder /app/website/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/website/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the website using the local scripts
CMD ["npm", "start"]
