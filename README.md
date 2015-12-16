[![Build Status](https://travis-ci.org/munxar/reddit.svg?branch=master)](https://travis-ci.org/munxar/reddit)

# linkit
Linkit is a simplified reddit clone build with the MEAN stack.

##linkit is built with:
 * [Node.js](http://www.nodejs.org/)
 * [MongoDB](http://www.mongodb.org/)
 * [Mongoose](http://mongoosejs.com/)
 * [Typescript](http://www.typescriptlang.org/)
 * [jspm](http://jspm.io/)
 * [Express](http://expressjs.com/)
 * [AngularJS](http://angularjs.org/)
 * [Angular Material](https://material.angularjs.org)

In addition we use typescript and jspm to make use of es6 modules in the frontend.

## Setup
You need the following binaries installed:
- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

```sh
# Install Gulp and Typescript globally
$ npm install -g gulp tsd

# Install project Node dependencies
$ npm install
```

## Development
```sh
# Run primary daemon process for MongoDB system
$ mongod
# Start Node Server and Gulp Task by running
$ gulp serve
```

## Production
```sh
# Run NPM Bundle to build dist Folder
$ npm run bundle
# Run primary daemon process for MongoDB system
$ mongod
# Start Node Server and Gulp Task by running
$ gulp serve
```
Run this Site to access production build [http://localhost:3000/index2.html](http://localhost:3000/index2.html)

# requirements
tested with local installation of:
 - node (0.12.8 & 5.1.1)
 - mongodb (3.0.6)
 - gulp (3.9.0)

 ## Device Lab
![User Image](images/devicelab.jpg)
We tested the App on following devices:
- iPhone 5s
- iPad mini
- iPad Pro
- MacBook Pro
- MacBook Air

# build and test
```sh
$ gulp
```

## Test
To Test our Application we wrote unit and integration tests for backend and frontend.

We use following Test Libraries:
* [Karma](http://karma-runner.github.io/0.13/index.html)
* [Mocha](http://mochajs.org/)
* [Chai](http://chaijs.com/)

## Usertest

### Userin 1
![User Image](images/userin1.jpg)
- login / register, username / password no length validation [x]
- If user / password is wrong, display a message [x]
- On Title details, display time and user only [x]
- If User removes a Topic or Comment, ask if ok to delete  [x]
- Seperate Change Password and Remove Account on Account Page [x]
- add Cloak [x]
- add Breadcrumb for better orientation [x]

### Userin 2
![User Image](images/userin2.jpg)
- Detail page is not obvious (I have to click on comments to see details)
- URL is not shown on detail (better for UX, what do I click here)
- Title on detail links to home site not to website (url)
- After password change form is wrong [x]
- After comment a Topic form is wrong
- Title on Mobile is cutted [x]
- Newest Topic is at the bottom [x]
- URLS with https are not working (it writes https//) [x]


# status
Link Modul
- erfassen [x]
- löschen [x]

Kommentar Modul
- link kommentieren [x]


Rating Modul
- Links bewerten [x]
- Kommentare bewerten [x]
- Rating rückgängig machen [x]

User Modul
- User erfassen / login [x]
- User password change [x]
- optional: Account löschen [x]

Security Modul
- User Login [x]
- User Logout [x]
- authorization nur angemeldete User können Link, Kommentare, Rating verändern [x]

Optional
- Performance Optimierung [x]
- WCAG [x]
