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

# Install dependencies from the root (only for website workspace to reduce memory/disk overhead)
RUN npm install --legacy-peer-deps --workspace=website --include-workspace-root --include=dev

# Now copy the rest of the source
COPY website ./website

# Build the website
WORKDIR /app/website
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--max-old-space-size=1536"

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/website/.next/static ./website/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/website/public ./website/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "website/server.js"]
