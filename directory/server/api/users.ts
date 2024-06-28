import type { VercelRequest, VercelResponse } from '@vercel/node';
import quyx from '../lib/quyx';
import checkOrigin from '../lib/checkOrigin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') return res.status(405).write('Method Not Allowed');
    checkOrigin(req, res);

    let { page = '1', limit = '40' } = req.query;

    const page_num = parseInt(page as string);
    const limit_num = parseInt(limit as string);
    if (isNaN(page_num) || isNaN(limit_num)) return res.status(400);

    const response = await quyx.space.users.all({ limit: limit_num, page: page_num });
    return res.status(200).json(response);
}
