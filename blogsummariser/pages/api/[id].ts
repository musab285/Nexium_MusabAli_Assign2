import { prisma } from "@/lib/prisma"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const numericId = Array.isArray(id) ? parseInt(id[0], 10) : id ? parseInt(id, 10) : undefined;

  if (!numericId || isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    console.log("Fetching specific summary with ID:", numericId);

    const specific = await prisma.summaries.findUnique({
      where: {
        id: numericId,
      },
    });

    if (!specific) {
      return res.status(404).json({ error: "Summary not found" });
    }

    return res.status(200).json({ data: specific, success: true });

  } catch (error) {
    console.error("Error fetching summary:", error);
    return res.status(500).json({ error: "Failed to fetch summary" });
  }
}
