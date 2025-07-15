import { scrapeContent } from "@/lib/scrape";
import { NextApiRequest, NextApiResponse } from "next";
import { CohereClient } from "cohere-ai";
// import { env } from "process";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cohere = "g0r9EXl6WsPn2LciylbBUzSA4lB08MidGXXD7F5o";
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    try{
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const content = await scrapeContent(url);
        if (!content || content.trim() === "") {
            return res.status(404).json({ error: "Content not found or is empty" });
        }

        try {
            const client = new CohereClient({ token: cohere });
            const summarised = await client.summarize({
                text: content,
                length: "medium",
                format: "paragraph",
                extractiveness: "medium"
            }); 
            return res.status(200).json({ output: summarised.summary, content: content });
        }
        catch (error) {
            console.error("Failed to summarise content:", error);
            return res.status(500).json({ error: "Failed to summarise content" });
        }
    }
    catch (error) {
        console.error("Failed to scrape content:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
