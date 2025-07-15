import axios from 'axios';

interface TranslateRequest {
  q: string;
  source: string;
  target: string;
  format?: 'text' | 'html';
  api_key?: string;
}

interface TranslateResponse {
  translatedText: string;
}

export async function translateText({
  q,
  source,
  target,
  format = 'text',
}: TranslateRequest): Promise<string> {
  try {
    const response = await axios.post<TranslateResponse>(
      'https://libretranslate.com/translate',
      {
        q,
        source,
        target,
        format,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data.translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    throw new Error('Failed to translate');
  }
}
