# Use Node.js 18 Debian-based image (not Alpine)
FROM node:18-bullseye

WORKDIR /app

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Set OpenSSL legacy mode to fix cipher issues
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Disable strict SSL checks
RUN npm config set strict-ssl false

COPY package.json package-lock.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
