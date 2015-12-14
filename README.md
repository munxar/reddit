[![Build Status](https://travis-ci.org/munxar/reddit.svg?branch=master)](https://travis-ci.org/munxar/reddit)

# linkit
simplified reddit clone build with the MEAN stack.

In addition we use typescript and jspm to make use of es6 modules in the frontend.

## Setup
You need the following binaries installed:
* [node](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

Install the following npm tools globally
```$
npm install -g gulp tsd
```

## Install Dependencies
```$
npm install
```

## Development
```$
mongod
gulp serve
```

# requirements
tested with local installation of:
 - node (0.12.8 & 5.1.1)
 - mongodb (3.0.6)
 - gulp (3.9.0)

# build and test
gulp

# status
Link Modul
- erfassen [x]
- löschen [x]

Kommentar Modul
- link kommentieren [x]
- optional: Kommentar kommentieren []

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
- authorization nur angemeldete User könne Link, Kommentare, Rating verändern [x]

Optional
- Performance Optimierung []
- WCAG [x]
