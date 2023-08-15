const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

const HOSTNAME = '127.0.0.1';
const PORT = 8000;
const TIMEOUT = 4000;

const constacts = {
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
        age: 43,
        city: 'Poltava'
    }
};

app.get('/', (req, res) => {
    console.log('GET /');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(`
        <form action="/login" method="POST">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" /><br><br>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" /><br><br>
            <button type="submit">Sign In</button>
        </form>
    `)
})

app.get('/contacts', (req, res) => {
    console.log('GET /contacts');
    res.json(constacts);
});

app.use((req, res, next) => {
    console.time('Middleware execution');
    console.log('Middleware started...🚀');
    setTimeout(() => {
        console.log('Middleware finished...🏁');
        console.timeEnd('Middleware execution');
        next();
    }, TIMEOUT)
});

app.get('/hello', (req, res) => {
    console.log('GET /hello');
    res.send('Hello universe!');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, password: ${password}`);
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Expess app is running 🛸 at ${HOSTNAME}:${PORT}`);
});
