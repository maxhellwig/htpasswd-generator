# htpasswd-generator

This project provides a web application which generates bcrypt hashed htpasswd entries.  
The app uses hash algorithms implemented in JavaScript, so your password does not leave your browser.
A web worker is used to delegate password hashing to another thread. This keeps the UI responsive while generating the hashed password entry.

[bcryptjs](https://github.com/dcodeIO/bcrypt.js/) is used for [bcrypt](https://en.wikipedia.org/wiki/Bcrypt), it's the [recommended](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) hashing algorithm.

## App gets deployed to netlify:
[https://htpasswd-generator.netlify.app/](https://htpasswd-generator.netlify.app/)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/402b6d07-1479-45f1-b571-528198eeadda/deploy-status)](https://app.netlify.com/sites/htpasswd-generator/deploys)

## Project setup

```
git clone https://github.com/maxhellwig/htpasswd-generator.git
```

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
