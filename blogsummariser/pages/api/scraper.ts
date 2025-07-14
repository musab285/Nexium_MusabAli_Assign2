import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    
    try {
        const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        });
    
        const $ = cheerio.load(data);
        // const title = $('head title').text();
        const content = $('.article-content, .post-content, .blog-post, .post-body').find('p, span, div').map((i, el) => $(el).text()).get().join(' ');

        return res.status(200).send(content.trim());
    } catch (error) {
        console.error("Error scraping URL:", error);
        return res.status(500).json({ error: 'Failed to scrape content' });
    }
    
}

