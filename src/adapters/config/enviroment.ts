if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY must be set in .env file');
}

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export const PORT = process.env.PORT ?? 3000