# angular-restify-mongo-blogger
A simple blogger app using Angular, Restify, Mongo stack. Built from template-angular-restify-mongo

## Get up and running

### Installing Mongo

Download MongoDB from here: http://www.mongodb.org/downloads

### Installing Node

Install Node from here https://nodejs.org/

### Executing Mongo

$ mongod --config /usr/local/etc/mongod.conf  

### Getting code and all dependencies

$ git clone https://github.com/paulhemmings/angular-restify-mongo-blogger.git

$ npm install

### Running application
#### be_ip is the public IP of the address where Mongo is hosted.
#### optional - defaults to 'localhost'

$ node ./scripts/restify-server.js --be_ip 10.240.0.2

### View site

$ open http://localhost:8080
