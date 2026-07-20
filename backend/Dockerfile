# Use Node.js 22 lightweight version
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Set environment variable for port
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
