import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
    const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
    if (req.headers.origin && req.headers.origin !== ALLOWED_ORIGIN) return res.status(403);
}
