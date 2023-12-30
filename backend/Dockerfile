# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies, including 'devDependencies' for building the TypeScript app
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Start a new stage from scratch
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built JavaScript code from the previous stage
COPY --from=builder /usr/src/app/dist ./dist

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app (assumes your output directory is named 'dist')
CMD [ "node", "dist/index.js" ]
