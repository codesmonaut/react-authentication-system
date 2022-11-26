const express = require(`express`);
const helmet = require(`helmet`);
const hpp = require(`hpp`);
const cors = require(`cors`);
const bcrypt = require(`bcryptjs`);

// App config
const app = express();
const port = process.env.PORT || 3030;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(cors());

// DB config
const users = [];

app.get(`/users`, (req, res) => {
    res.status(200).send(users);
})

// API endpoints
app.post(`/register`, async (req, res) => {
    
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }

        users.push(newUser);

        res.status(201).send({ username: newUser.username });

    } catch (err) {
        res.status(500).send(`Error on the server.`);
    }
})

app.post(`/login`, async (req, res) => {
    
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = users.find(acc => acc.email === email);

        if (!user) {
            return res.status(401);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401);
        }

        if (match) {
            res.status(200).send({ username: user.username });
        }
        
    } catch (err) {
        res.status(500).send(`Error on the server.`);
    }
})

// Listener
app.listen(
    port,
    console.log(`Server is running on port http://localhost:${port}`)
)