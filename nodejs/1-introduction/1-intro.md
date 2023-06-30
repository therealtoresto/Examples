# Introduction

## Main idea of Node.js

```text
+------------+  HTTP(s)/WS(s)
| mobile app | <----------+
+------------+     JSON   |
                          |
+------------+            +->  +--------+   JSON   +--------+
|  browser   | <------------>  | server | <------> |  DBMS  |
+------------+            +->  +--------+   BSON   +--------+
                          |
+------------+            |
|  desktop   | <----------+
+------------+

+------------------------------+----------+--------+----------+
| JavaScript |                 |JavaScript|        |JavaScript|
--------------------------------------------------------------+
|SpiderMonkey|                 |  Node.js |        |          |
|    V8      |                 | JSON ser.|        |          |
|  Electron  |                 |          |        |          |
|React Native|                 |          |        |          |
|  Cordova   |                 |          |        |          |
+------------+-----------------+----------+--------+----------+
```

## Node.js place

```text
+--------+    +-----------+   +------------+   +-----+
| Web UI |    | Mobile UI |   | Desktop UI |   | CLI |
+--------+    +-----------+   +------------+   +-----+
    |   http(s)     |     ws(s)     |    etc.     |
    |               |               |             |
    +-----------+   +------+  +-----+  +----------+
                |          |  |        |
                v          v  v        v
                +----------------------+            +---------+
                |                      |  web hook  | Remote  |
                |    Node.js server    | <--------- | Service |
                |                      | ---------> |   API   |
                +----------------------+   http(s)  +---------+
                    |       |      |
                +---+       |      +---+
                |    query  |  access  |
                v           v          v
       +------------+   +-------+  +--------------+
       |  Postgres  |   | Redis |  | Disk storage |
       +------------+   +-------+  +--------------+
```

## Node.js inside

```text
  +-----------------------------------------------------------------+
  |  Node.js                             +------------------------+ |
  | +--------------------------------+   | V8                     | |
  | | libuv       +----------------+ |   | +--------------------+ | |        http(s) / ws(s)
  | |             | Callback queue | |   | | JS +-------------+ | | |  <-----------------------------
  | |             +----------------+ |   | |    | Application | | | |
  | | +-------------+ +------------+ |   | |    +-------------+ | | |
  | | | Thread pool | | Event loop | |   | | +----------------+ | | |
  | | +-------------+ +------------+ |   | | |  Dependencies  | | | |
  | +--------------------------------+   | | |  node_modules  | | | |
  |                                      | | +----------------+ | | |
  | +--------+  +-------+  +----------------------------------+ | | |        OS calls / IPC
  | | Addons |  | N-API |  |   Node  standart  library  API   | | | |  ------------------------------>
  | +--------+  +-------+  +----------------------------------+ | | |
  |                                      | +--------------------+ | |
  | +--------------------------------+   | |     Webassembly    | | |
  | |   openssl llhttp zlib, c-ares  |   | +--------------------+ | |
  | +--------------------------------+   +------------------------+ |
  +-----------------------------------------------------------------+
```

## What is Node.js?

- _Cross-platform non-blocking_ I/O **libuv** (tcp/udp, dns, fs)
  - Thread pool - 4 threads (concurency control in main thread)
  - Event loop (handling callbacks, errors, asyncronous)
  - Callback queue (task storage for event loop)

- _С++_ written **shell** (addons (binary libs));

- _Open Source_ JavaScript engine **V8** (chakra core / spidermonkey) - runtime for js;

- _N-API_ - **interface** for writting libs (Rust);

- Crypto lib OpenSSL (tls, crypto, http2, https)

- etc.

## Why Node.js?

_Any application that can be written in **JavaScript**, \
 will be eventually be written in **JavaScript**_

Jeff Atwood \
Stack Overflow founder

## Advantages\disadvantages of Node.js

- **Very** low entry level (bad code);

- **Incredible** flexibility (overengineering);

- **Very fast** development speed (fast is not always good in development);

- **Excellent** level of abstraction.

## Get started

- <https://nodejs.org/en/download>
- <https://nodejs.org/en/download/package-manager>
- brew install node
- Node repo: <https://github.com/nodejs/node>
- Node version manager: <https://github.com/nvm-sh/nvm>
- Node version switcher: <https://github.com/jasongin/nvs>

## Module System in Node.js

CommonJS

ES Modules (mjs / type)

## Build-in API

<https://nodejs/api>

**Globals:** global, process, Buffer, setImmediate, setInterval, setTimeout \
clearImmediate, clearInterval, clearTimeout (Browser API / Node API: node:timers) \
_JavaScript_: Date, parseInt, Object, Error...

**Injected:** console(node), module(cjs), require(cjs), __dirname, \__filename
Modules loader(cjs, es) wrap stript in function, and inject this ids in closure.

**Modules:** os, net, http, dns, crypto, fs, path, zlib, cluster, \
child_process, stream...

## NPM

<https://docs.npmjs.com/cli/install>

```bash
npm init
npm install / uninstall [module-name] --save
npm audit fix
npm t
npm i eslint -g
npm publish
```

## Often used for

- Web application server / SPA
- Mobile application server
- Frontend build system (webpack)
- Chats, messaging
- Games server
- as Patch for other software
- Parsers, web crawler(search)

## Rarely used

- Window app(Electron)
- Database app / Enterprise
- Industrial Automatisation
- Microcontroller programming(arduino)
- handlind and streaming video or sound

## Rarely used but good for

- CMS (PHP)
- content publishing
- ecommerce
- trading
- medicine
- warehouse
- accounting

## Is not good for

- heavy calculations
- science apps(modeling, calc)
- realtime systems(garbage collector)

## Wat`s new?

- Promises API
- Streams
- ESM
- Fetch (~~axios~~)
- Web API
- Web streams
- Http/3
- node:test (test-runner)
- Performance(telemetry)
- OpenSSL 3 (added new crypto alg)
- async_hooks
- V8

## Problems of Node.js

- Single thread Node.js (false)
- Single thread JS (not problem)
- Bad paralelism model!!!

>**It`s not a problem!**

## Main problem is

Context isolation - all users are in one address space

>**How it fix?**

PROCESS \
Thread \
v8::Isolate \
v8::Context \

Closures?

## Other problems of Node.js

- Memory leaks
- Callback hell
- Promise hell
- Blocking operations (long loops)
- Errors handling
- Process crashing
- Security holes (npm code)

## What about devs?

- poor knowledge of Node.js
- 100 MB of deps.
- legasy frameworks
- community
- knowledges about asynchronous
- Fast start, but...

## How to fix?

- ~~TypeScript~~
- ~~GraphQL~~
- ~~Cloud~~
- ~~Data Structures and algorithms~~
- ~~React.js~~ (logic to frontend)

## Learn Node.js API

> IT IS BETTER THAN NPM LIBS !!!

fs, v8, child_process, worker_threads, \
perf_hooks, crypto, assert, stream/web, \
async_hooks, async_context, events, wasi

+\
|\
|\
|\
|\
v
>Will a robot replace you?
