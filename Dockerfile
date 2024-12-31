# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the TypeScript application
RUN pnpm build

# Stage 2: Run
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

# Copy only the necessary files for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod


# Command to run the application
CMD ["node", "dist/src/main.js"]
