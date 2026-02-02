# ---- Base image ----
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all source files
COPY . .

# Build the app (TypeScript + tsc-alias + email templates)
RUN yarn build

# Expose the port the app listens on
EXPOSE 3000

# Start the app using your package.json script
CMD ["yarn", "start:dev"]
