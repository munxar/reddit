[![Build Status](https://travis-ci.org/munxar/reddit.svg?branch=master)](https://travis-ci.org/munxar/reddit)

# linkit
simplified reddit clone build with the MEAN stack.

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

# build and test
```sh
$ gulp
```

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

Bugs / offene Punkte
- login / register username / password keine length validierung [x]
- wenn user / pass falsch, kommt keine warnung [x]
- evtl. "submited" weglassen nur time und user [x]
- breadcrumb !
- delete mit ok / cancel
- account mit unterformularen [x]
- cloak [x]
- After password change, form is wrong
- after comment red input (form is wrong)
- Title on Mobile is cutted [x]
- detail page is not obvious (i have to click on comments)
- URL is not shown on detail (better for UX, what do I click here)
- Title on detail -> links to home site not page (url)
- newest Topic is at the bottom [x]
- URLS with https are not working (it writes https//) [x]



