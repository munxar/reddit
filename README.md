[![Build Status](https://travis-ci.org/munxar/reddit.svg?branch=master)](https://travis-ci.org/munxar/reddit)

# reddit
simplified reddit clone build with the MEAN stack.

In addition we use typescript and jspm to make use of es6 modules in the frontend.


# requirements
tested with local installation of:
 - node (5.1.1)
 - mongodb (3.0.6)
 - gulp (3.9.0)

(but should work with node 4.x.x or older)

# run in development mode
gulp watch

# build and test
gulp

# status
Link Modul
- erfassen [x]
- löschen []

Kommentar Modul
- link kommentieren []
- Kommentar kommentieren [] (optional)

Rating Modul
- Links bewerten
- Kommentare bewerten
- Rating rückgängig machen

User Modul
- User erfassen / login [x]
- User password change []
- Account löschen [] (zusätzlich)

Security Modul
- User Login [x]
- User Logout [x]
- authorization nur angemeldete User könne Link, Kommentare, Rating verändern

Language Modul
- Sprachumschaltung [] (einfach) (en, de evtl. fr, it)

Optional
- Performance Optimierung [] (einfach da jspm schon bundling hat)
- WCAG [] (einfach da angular-aria)
- rss feed [] (super optional anstelle SEO)
