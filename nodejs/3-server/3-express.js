const express = require('express');

const app = express();

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const TIMEOUT = 4000;


// using body parser
app.use(express.urlencoded({ extended: true }));

const contacts = {
    john: {
        name: 'John',
        age: 32,
        city: 'Kyiv'
    },
    bill: {
        name: 'Bill',
        age: 20,
        city: 'Lviv'
    },
    linda: {
        name: 'Linda',
        age: 54,
        city: 'Poltava'
    }
};

// get '/' endpoint handler
app.get('/', (req, res) => {
    console.log('GET /');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(`
        <form action="/login" method="POST">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Sign In</button>
        </form>
    `);
});

// get '/contacts' endpoint handler
app.get('/contacts', (req, res) => {
    console.log('GET /contacts');
    res.json(contacts);
});

// using middleware example
app.use((req, res, next) => {
    console.time('Middleware execution');
    console.log('Middleware started...🚀');
    setTimeout(() => {
        console.log('Middleware finished 🏁');
        console.timeEnd('Middleware execution');
        next();
    }, TIMEOUT);
});

// get '/hello' endpoint handler
app.get('/hello', (req, res) => {
    console.log('GET /hello');
    res.send('Hello universe!');
});

// post '/login' endpoint handler
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, password: ${password}`);
});


// running server
app.listen(PORT, HOSTNAME, () => {
    console.log(`Express app is running 🛸 at ${HOSTNAME}:${PORT}`);
});
