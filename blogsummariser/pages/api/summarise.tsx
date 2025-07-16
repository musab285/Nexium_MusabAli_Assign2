import { scrapeContent } from "@/lib/scrape";
import { NextApiRequest, NextApiResponse } from "next";
import { CohereClient } from "cohere-ai";
// import { prisma } from "@/lib/prisma"; // Ensure you have a Prisma client instance set up


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

        const content= await scrapeContent(url);
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
        const title = content.split('\n')[0].trim() || "Untitled";
        // try {
        //     const post = await prisma.Summaries.create({
        //         data: {
        //         title,
        //         content,
        //         },
        //     })
        //     console.log("Post created:", post);
        // }
        // catch (error) {
        //     console.error("Error creating post in database:", error);
        //     // return res.status(500).json({ error: "Failed to save post to database" });
        // }

        return res.status(200).json({ output: summarised.summary, content });
    } catch (error) {
        console.error("Error summarizing content:", error);
        return res.status(500).json({ error: "Failed to summarize content" });
    }

}
