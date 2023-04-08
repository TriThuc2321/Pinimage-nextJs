// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

type Data = {
    message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(404).json({ message: 'Method not supported' });
    }
    try {
        const accessToken = req.body.accessToken || '';

        const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
        cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            // expires: new Date(expiredAt),
        });
        (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
    } catch (error) {
        console.log({ error });
        (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
    }
}
