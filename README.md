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

### Error Handling

So we need some type of way of listening for errors, catching errors, handling errors, and node.js has some pretty good ways to do that. Depending on the type of code (sync, promise, async callback, async await, etc) Node allows us to handle our errors how we see fit.

#### Process exiting

To understand the process of node.js. What that is and how that runs. So, when an exception is thrown in node.js or an error, the current process will exit with a code of one fact we might see like this.

```sh
> node errors.mjs
node:internal/process/esm_loader:94
    internalBinding('errors').triggerUncaughtException(
                              ^

[Error: ENOENT: no such file or directory, open '/Users/rezha/Documents/Course/template.html'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/rezha/Documents/Course/template.html'
}
```

When a exception is thrown in Node.js, the current process will exit with a code of `1`. This effectively errors out and stops your programing completely. You can manually do this with:

`process.exit(1)`

Although you shouldn't. This is low level and offers no chance to catch or handle an exception to decide on what to do.

#### Async Errors

When dealing with callbacks that are used for async operations, the standard pattern is:

```js
fs.readFile(filePath, (error, result) => {
  if (error) {
    // do something
  } else {
    // yaaay
  }
})
```

```js
import { readFile } from 'fs';

readFile(new URL('./../template.html', import.meta.url), 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  }else {
    console.log('no errors');
  }
});
```

```sh
> node errors.mjs
[Error: ENOENT: no such file or directory, open '/Users/rezha/Documents/Course/template.html'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/rezha/Documents/Course/template.html'
}
```

Callbacks accept the `(error, result)` argument signature where error could be `null` if there is no error.

For `promises`, you can continue to use the `.catch()` pattern. Nothing new to see here.

For `async / await` you should use `try / catch`.

```js
try {
  const result = await asyncAction()
} catch (e) {
  // handle error
}
```

#### Sync Errors

For sync errors, `try / catch` works just fine, just like with async await.

```js
try {
  const result = syncAction()
} catch (e) {
  // handle error
}
```

#### Catch All

Finally, if you just can't catch those pesky errors for any reason. Maybe some lib is throwing them and you can't catch them. You can use:

```js
process.on('uncaughtException', cb)
```

## Server

### Hard Way

Node.js ships with the http module. This module is an abstraction around OS level networking tools. For Node.js, the http module would be considered "low level". Let's create a simple server.

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

and to stop server ctrl + C

### Express

There is an awesome packaged, express, that makes creating servers in Node.js a breeze. We're going to use it now.

npm install express body-parser morgan

express - a framework for building servers
body-parser - a middleware that parses incoming requests
morgan = a middleware for logging incoming requests
With everything installed, we'll create a simple API for a todo app using express.

```js
import express from 'express';
import morgan from 'morgan';
import bp from 'body-parser';

const { urlencoded, json } = bp;

const db = {
  todos: [],
}

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

app.get('/todo', (req, res) => {
  res.json({ data: db.todos });
})

app.post('/todo', (req, res) => {
  const newTodo = { complete: false, id: Date.now(), text: req.body.text }
  db.todos.push(newTodo);

  res.json({ data: newTodo });
})

app.listen(8000, () => {
  console.log('Server on http://localhost:8000')
});
```
