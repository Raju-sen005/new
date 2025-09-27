# Use Node.js 18 Debian-based image (not Alpine)
# FROM node:18-bullseye

# WORKDIR /app

# Install OpenSSL
# RUN apt-get update && apt-get install -y openssl

# Set OpenSSL legacy mode to fix cipher issues
# ENV NODE_OPTIONS="--openssl-legacy-provider"

# Disable strict SSL checks
# RUN npm config set strict-ssl false

# COPY package.json package-lock.json ./

# Install dependencies with legacy peer deps
# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

# --- Stage 1: Build the React Application ---

FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Build the application for production
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy custom Nginx configuration from the root directory to the container
# NOTE: This assumes nginx-frontend.conf will be placed next to docker-compose.yml
# The compose file will handle mounting the config into the container's expected path.
# We skip this step here as the compose file will define the volume for the .conf file.

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage to the Nginx content directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80, handled by Nginx
EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

