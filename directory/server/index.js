const express = require('express');
const QuyxSdk = require('@quyx/ts');
const cors = require('cors');
const helmet = require('helmet');
const { get } = require('lodash');
require('dotenv').config();

const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8085;
const QUYX_SECRET_KEY = process.env.QUYX_SECRET_KEY;
if (!QUYX_SECRET_KEY) throw new Error('QUYX_SECRET_KEY not set in .env');

const quyx = new QuyxSdk.default({ sk: QUYX_SECRET_KEY });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN, methods: ['GET'] }));

app.use((_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    next();
});

app.get('/users', async function (req, res) {
    const page = parseInt(get(req.query, 'page', '1'));
    const limit = parseInt(get(req.query, 'limit', '40'));
    if (isNaN(page) || isNaN(limit)) return res.sendStatus(400);

    const response = await quyx.space.users.all({ limit, page });
    return res.status(200).json(response);
});

app.get('/user/:address', async function (req, res) {
    const { address } = req.params;

    const response = await quyx.space.users.single(address);
    return res.status(200).json(response);
});

app.get('/', async function (_, res) {
    const response = await quyx.space.info();
    return res.status(200).json(response);
});

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.........`));
    } catch (err) {
        console.log(err);
    }
};

start();
module.exports = app;
