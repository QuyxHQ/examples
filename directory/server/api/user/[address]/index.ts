import type { VercelRequest, VercelResponse } from '@vercel/node';
import quyx from '../../../lib/quyx';
import checkOrigin from '../../../lib/checkOrigin';

export default async function handler(req: VercelRequest, res: VercelResponse, { params }: any) {
    if (req.method !== 'GET') return res.status(405).write('Method Not Allowed');
    checkOrigin(req, res);

    const { address } = params;

    const response = await quyx.space.users.single(address);
    return res.status(200).json(response);
}
