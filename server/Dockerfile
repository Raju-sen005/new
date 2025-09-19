# 1. Use official Node.js 20 Alpine image
FROM node:20-alpine

# 2. Set working directory to root (not recommended but allowed)
WORKDIR /

# 3. Copy package files first (for Docker layer caching)
COPY package*.json ./

# 4. Install build dependencies temporarily and app dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm install --legacy-peer-deps --audit-fix \
    && apk del .gyp

# 5. Copy the rest of the source code into the container
COPY . .

# 6. Expose your app's port
EXPOSE 8000

# 7. Start the Node.js app
CMD ["node", "server.js"]
