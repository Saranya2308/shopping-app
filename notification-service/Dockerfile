# Use official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./src/package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port the app is running on
EXPOSE 3004

# Start the app
CMD ["npm", "start"]
