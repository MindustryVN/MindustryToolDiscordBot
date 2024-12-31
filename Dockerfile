# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
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

# Copy only necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the port the app uses
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
