import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeContent(url: string): Promise<string> {
  try {
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000, 
    });

    const $ = cheerio.load(response.data);

    // // Remove script and style elements
    $('script, style, noscript').remove();
    let content = '';
    
    if (!content) {
      const paragraphs = $('p')
        .map((_, el) => $(el).text().trim())
        .get()
        .filter(text => text.length > 20); // Filter out short paragraphs

      content = paragraphs.join(' ');
    }

     // If still no content, try a broader approach
    if (!content) {
      content = $('body')
        .find('p, div, span, h1, h2, h3, h4, h5, h6')
        .map((_, el) => {
          const text = $(el).text().trim();
          return text.length > 10 ? text : '';
        })
        .get()
        .filter(text => text.length > 0)
        .join(' ');
    }
    

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      await fetch(`${baseUrl}/api/scraped` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, content }),
      });
    } catch (error) {
      console.error("Error saving scraped content:", error);
    }

    return content;
  } catch (error) {
    console.error('Error scraping content:', error);
    throw new Error(`Failed to scrape content from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
