import { prisma } from "@/lib/prisma"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const history = await prisma.summaries.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json({data:history, success: true});
    } catch (error) {
        console.error("Error fetching history:", error);
        return res.status(500).json({ error: "Failed to fetch history" });
    }
}