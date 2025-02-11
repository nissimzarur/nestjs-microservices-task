# Use a lightweight Node.js image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies (including development dependencies)
RUN npm install

# Copy the rest of the app’s code
COPY . .

# Run the TypeScript build command to compile the code
RUN npm run build

# ---- Production Image ----
FROM node:18-alpine

# Set the working directory for the production container
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist 
COPY --from=builder /app/tsconfig.json ./tsconfig.json 

# Expose the application port
EXPOSE 3000

# Run the compiled app
CMD ["node", "dist/main.js"]
