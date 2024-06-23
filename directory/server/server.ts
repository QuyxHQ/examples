import express, { Response, NextFunction, Request } from 'express';
import QuyxSdk from '@quyx/ts';
import cors from 'cors';
import helmet from 'helmet';
import { get } from 'lodash';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8085;
const QUYX_SECRET_KEY = process.env.QUYX_SECRET_KEY;
if (!QUYX_SECRET_KEY) throw new Error('QUYX_SECRET_KEY not set in .env');

const quyx = new QuyxSdk({ sk: QUYX_SECRET_KEY });

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN, methods: ['GET'] }));

app.use((_, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    next();
});

app.get('/users', async function (req: Request, res: Response) {
    const page = parseInt(get(req.query, 'page', '1') as string);
    const limit = parseInt(get(req.query, 'limit', '40') as string);
    if (isNaN(page) || isNaN(limit)) return res.sendStatus(400);

    const response = await quyx.space.users.all({ limit, page });
    return res.status(200).json(response);
});

app.get('/user/:address', async function (req: Request, res: Response) {
    const { address } = req.params;

    const response = await quyx.space.users.single(address);
    return res.status(200).json(response);
});

app.get('/', async function (_: Request, res: Response) {
    const response = await quyx.space.info();
    return res.status(200).json(response);
});

const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, () => console.log(`Server is running on port ${PORT}`));
