# Roster Challenge
This repository consists of both the Client and Server required for the Roster Challenge. It's designed and structured with the MEAN Stack framework.  

## RosterAPI
RosterAPI is an Express Node.js service built in conjunction with RosterClient. The goal was to design a service that is scalable to future additions of collections, or databases. The Database layer consists of a connection to Mongo Atlas, with Mongoose installed to solidify the service layer's communication and integrity to the Database.

To prepare the service, navigate to rosterAPI and run ```npm install```. The RosterAPI requires a ```.env``` file that stores credentials to a designated Database. Create a file in the rosterAPI root called ```.env```. Copy a URI to a MongoDB instance to ```CONNECTION_URI```, set the ```PORT``` to ```3000``` and the name of the database to ```DB_NAME```. To start the server locally, enter ```node index.js```, or ```nodemon```, if the package is installed.

## RosterClient
RosterClient is an Angular application built in conjunction with RosterAPI. To prepare the service, navigate to rosterClient and run ```npm install```. To start the client locally, navigate to  enter ```ng serve```, or ```npm start```. The application is stylized with Bootstrap4 and attempts to reduce the amount of dependencies required.

##### Tools used to develop the repository
- Visual Studio Code
- Postman
- Studio/Robo 3T

##### Required Drivers and packages
- MongoDB
- Node.js
- Angular

## Future Tasks
- [ ] Swagger installed onto the server
- [ ] Karma test suites 
- [ ] OAuth2 authentication
- [ ] Full CRUD operations open on rosterClient
