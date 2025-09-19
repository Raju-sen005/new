# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /src

# Install OpenSSL and build tools
RUN apk add --no-cache openssl python3 make g++ \
  && npm config set strict-ssl false

# Set OpenSSL legacy provider flag for Vite dev mode
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy package files first for better cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run the dev server on host mode
CMD ["npm", "run", "dev", "--", "--host"]
