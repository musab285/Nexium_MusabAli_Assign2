// import mongoose from 'mongoose';
import { Content } from '@/lib/model/content';
import dbConnect from '@/utils/db';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    console.log('Connecting...');
    await dbConnect();
    console.log('Connected');

    console.log('Data received:', req.body);

    const { url, content } = req.body;

    const saved = await Content.create({ url, content });
    console.log('Data saved:', saved);  
    return res.status(201).json(saved);
  } catch (err) {
    console.error('Mongoose error:', err);
    return res.status(500).json({ error: 'DB Error' });
  }
}


