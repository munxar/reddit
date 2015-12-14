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
mongod
gulp serve
```

# requirements
tested with local installation of:
 - node (5.1.1)
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
- Kommentar kommentieren [] (optional)

Rating Modul
- Links bewerten [x]
- Kommentare bewerten [x]
- Rating rückgängig machen [x]

User Modul
- User erfassen / login [x]
- User password change [x]
- Account löschen [] (zusätzlich)

Security Modul
- User Login [x]
- User Logout [x]
- authorization nur angemeldete User könne Link, Kommentare, Rating verändern [x]

Language Modul
- Sprachumschaltung [] (einfach) (en, de evtl. fr, it)

Optional
- Performance Optimierung [] (einfach da jspm schon bundling hat)
- WCAG [x] (einfach da angular-aria)
- rss feed [] (super optional anstelle SEO)
