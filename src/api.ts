import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Maximum file size in bytes (20MB)
const MAX_FILE_SIZE = 20 * 1024 * 1024;
// Maximum content length for the API (approximately 30k characters)
const MAX_CONTENT_LENGTH = 30000;
// Maximum base64 content length to send to API (leaving room for message)
const MAX_BASE64_LENGTH = 25000;

export async function sendMessage(message: string, pdfFile?: File | null, apiKey?: string) {
  try {
    if (!apiKey) {
      throw new Error('A Gemini API key is required for AI responses.');
    }

    let content = message;
    let systemPrompt = "Provide concise, direct responses. Keep answers brief and to the point.";
    
    if (pdfFile) {
      // Check file size
      if (pdfFile.size > MAX_FILE_SIZE) {
        throw new Error('PDF file is too large. Maximum size allowed is 20MB.');
      }

      // Convert PDF to base64 using a Promise-based approach
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsDataURL(pdfFile);
      });

      let finalBase64 = base64Data;
      if (base64Data.length > MAX_BASE64_LENGTH) {
        finalBase64 = base64Data.substring(0, MAX_BASE64_LENGTH);
        console.warn('PDF content was truncated due to size limitations.');
      }

      // Modify system prompt for document summarization
      if (message.toLowerCase().includes('summarize') || message.toLowerCase().includes('summary')) {
        systemPrompt = "Provide a 2-3 line summary of the document's main contents. Focus only on key information and main topics. Ignore formatting, styling, and document structure.";
      }

      content = `${systemPrompt}\n\nUser Query: ${message}\n\nPDF Content: ${finalBase64}`;
    } else {
      content = `${systemPrompt}\n\nUser Query: ${message}`;
    }

    // Final length check
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new Error('Message is too long. Please try a shorter message or a smaller PDF file.');
    }

    let response;
    try {
      response = await axios.post(
        `${API_URL}?key=${apiKey}`,
        {
          contents: [{
            parts: [{ text: content }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150, // Limit response length
            topP: 0.8,
            topK: 40
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (axiosError: unknown) {
      const error = axiosError as {
        response?: { status?: number; data?: { error?: { message?: string } } };
        request?: unknown;
        message?: string;
      };
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 400) {
          throw new Error(`Invalid request: ${errorData.error?.message || 'Bad request format'}`);
        } else if (status === 401) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (status === 429) {
          throw new Error('Gemini quota is exhausted for the current key. Enter another Gemini key in Chatbot Generator and save the draft, then return here.');
        } else if (status === 413) {
          throw new Error('Content too large for the API. Please try a smaller message or PDF.');
        } else if (status >= 500) {
          throw new Error('Gemini API service is currently experiencing issues. Please try again later.');
        } else {
          throw new Error(`API Error (${status}): ${errorData.error?.message || 'Unknown error occurred'}`);
        }
      } else if (axiosError.request) {
        throw new Error('Unable to reach the Gemini API. Please check your internet connection.');
      } else {
          throw new Error(`Request failed: ${error.message}`);
      }
    }

    if (!response?.data) {
      throw new Error('Invalid response received from Gemini API.');
    }

    const candidates = response.data.candidates;
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error('No response generated. The API may be experiencing issues.');
    }

    const responseText = candidates[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      throw new Error('Invalid response format from Gemini API.');
    }

    return responseText;

  } catch (error: unknown) {
    const normalizedError = error instanceof Error ? error : new Error('An unexpected error occurred. Please try again.');
    console.error('Error details:', {
      message: normalizedError.message,
      stack: normalizedError.stack,
    });
    
    throw normalizedError;
  }
}
