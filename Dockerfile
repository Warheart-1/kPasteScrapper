# Use an official Node.js runtime as the base image
FROM node:20-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will run on (if needed)
# EXPOSE 3000

# Command to start the application
CMD [ "node", "index.js" ]  # Replace "index.js" with your entry file