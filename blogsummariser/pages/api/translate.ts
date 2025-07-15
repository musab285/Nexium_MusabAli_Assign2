import { translateText } from "@/lib/translate";
import { NextApiRequest, NextApiResponse } from "next";
import { scrapeContent } from "@/lib/scrape";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            const handleTranslate = async () => {
            const translatedText = await translateText({
            q: content,
            source: 'en',
            target: 'ur',
            });
            return res.status(200).json({ output: translatedText, content: content });}
        } catch (error) {
            console.error("Failed to translate content:", error);
            return res.status(500).json({ error: "Failed to translate content" });
        }
    }
    catch (error) {
        console.error("Failed to scrape content:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}