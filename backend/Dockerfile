# Use an official Node.js runtime as the base image
FROM node:18-alpine3.14

WORKDIR /src

COPY /package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Define the command to run your app (assumes your output directory is named 'dist')
CMD [ "npm", "run", "dev" ]
