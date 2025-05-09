# Use official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json from the src folder and install dependencies
COPY ./src/package*.json ./

RUN npm install

# Copy the rest of the code from the src folder
COPY ./src ./

# Expose the port the app is running on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
