# node-js

## What is Node.JS
Node.js is a runtime for built on tops of Chrome's V8. It allows you to develop apps in JavaScript outside of the browser. Its singel threaded non blocking and asynchronous. If you know JS then you already know how develop with Node.js

## Instalation
visit here to download <a href="https://nodejs.org/en/">here</a>

## Executing Node.Js

```sh
yusuf@Yusufs-MacBook-Pro yusuf-new-folder % which node
/usr/local/bin/node

yusuf@Yusufs-MacBook-Pro yusuf-new-folder % node --version
v14.16.1

yusuf@Yusufs-MacBook-Pro yusuf-new-folder % node
Welcome to Node.js v14.16.1.
Type ".help" for more information.
> const me = "Yusuf"
undefined
>  

yusuf@Yusufs-MacBook-Pro yusuf-new-folder % vim index.js
yusuf@Yusufs-MacBook-Pro yusuf-new-folder % node index.js
hello yusuf
```

## Basic Component

### Global

- global like window in node.js
- __dirname => directory file
- __filename => file name file
- process => all about environment is stored. ex node version, your platform, etc.
- exports, module, require => These globals are used for creating and exposing modules throughout your app.

```sh
yusuf@Yusufs-MacBook-Pro yusuf-new-folder % vim index.js
yusuf@Yusufs-MacBook-Pro yusuf-new-folder % node index.js 
/Users/yusuf/yusuf-new-folder /Users/yusuf/yusuf-new-folder/index.js
```

### Module

A module is a reusable chunk of code that has its own context. That way modules can't interfere with or polute the global scope.
You can think of them like lego blocks that you can create, import, and share.

```js
// utils.js
export const action = () => {
  console.log('ini action');
}

export const run = () => {
    console.log('ini run');
}
```
```
// app.js

import { action, run } from './utils'
```

## Server

### Express
There is an awesome packaged, express, that makes creating servers in Node.js a breeze. We're going to use it now.

npm install express body-parser morgan

express - a framework for building servers
body-parser - a middleware that parses incoming requests
morgan = a middleware for logging incoming requests
With everything installed, we'll create a simple API for a todo app using express.

```js
import http from 'http';

const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    })

    req.on('end', () => {
      if (req.headers['content-type'] === 'application/json') {
        body = JSON.parse(body);
      }

      console.log(body);
      res.writeHead(201);
      res.end('ok');
    })
  } else {
    res.writeHead(200);
    res.end('hello from my server');
  }

});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
```

```sh
yusuf@Yusufs-MacBook-Pro servers % node index.mjs
Server is running on http://localhost:8000
```



