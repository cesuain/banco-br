#This file is only for configuring a docker image on cirrus

#Setup NodeJS version
FROM node:14.17.4
 
#Use root user  
USER root

# Create app directory
WORKDIR /usr/dock

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/dock
RUN npm install

# Bundle app source
COPY . /usr/dock

#Start the server
CMD [ "npm", "start" ]