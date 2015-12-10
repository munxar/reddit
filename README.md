[![Build Status](https://travis-ci.org/munxar/reddit.svg?branch=master)](https://travis-ci.org/munxar/reddit)

# reddit
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
run local mongod
npm start
```

# requirements
tested with local installation of:
 - node (5.1.1)
 - mongodb (3.0.6)
 - gulp (3.9.0)

# run in development mode
gulp serve

# build and test
gulp
