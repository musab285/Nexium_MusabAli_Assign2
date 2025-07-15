import { scrapeContent } from "@/lib/scrape";
import { NextApiRequest, NextApiResponse } from "next";
import { CohereClient } from "cohere-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Use env variable — Vercel will inject it at build/runtime
    const cohere = process.env.COHERE_API_KEY;

    if (!cohere) {
        return res.status(500).json({ error: "Cohere API key not set in environment variables" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const content = await scrapeContent(url);
        if (!content || content.trim() === "") {
            return res.status(404).json({ error: "Content not found or is empty" });
        }

        const client = new CohereClient({ token: cohere });

        const summarised = await client.summarize({
            text: content,
            length: "medium",
            format: "paragraph",
            extractiveness: "medium",
        });

        return res.status(200).json({ output: summarised.summary, content });
    } catch (error) {
        console.error("Error summarizing content:", error);
        return res.status(500).json({ error: "Failed to summarize content" });
    }
}
