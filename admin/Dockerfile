# Use Node.js 20 Alpine image
# FROM node:20-alpine

# Set working directory
# WORKDIR /src

# Install OpenSSL and build tools
# RUN apk add --no-cache openssl python3 make g++ \
  # && npm config set strict-ssl false

# Set OpenSSL legacy provider flag for Vite dev mode
# ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy package files first for better cache
# COPY package.json package-lock.json ./

# Install dependencies
# RUN npm install --legacy-peer-deps

# Copy rest of the app
# COPY . .

# Expose Vite dev server port
# EXPOSE 5173

# Run the dev server on host mode
# CMD ["npm", "run", "dev", "--", "--host"]

# --- Stage 1: Build the React Application ---

FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage to the Nginx content directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80, handled by Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
