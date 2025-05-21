# Use Node 18 image
FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire backend code
COPY . .

# Expose the port that the Node.js server will run on inside the container
EXPOSE 5000

# Command to start the Node.js application (use the entry point of your backend)
CMD ["node", "server.js"]
