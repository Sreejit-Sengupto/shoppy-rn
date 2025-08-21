import { GoogleGenAI, Type } from '@google/genai';
import { appData } from 'data';

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});

const contextData = JSON.stringify(appData);

export const getSearchSuggestionFromAI = async () => {
  const prompt = `You are an AI designed to provide search suggestions exclusively based on the data contained within the following array of JSON objects. Do not use any external knowledge, assumptions, or information beyond what is provided in this array. Generate search suggestions for the user based on the products listed, focusing on their brand, product_name, category, and key features from the description. If the user's query cannot be matched to any products in the array, return an empty array []. Here is the array: ${contextData}
    User query: Generate 6 search recommendations/suggestions that I can use to search for a specific product. For example - "I need a lightweight laptop for travel with a long battery life".
    Respond only with the JSON object as specified.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text: 'You must strictly adhere to the instructions and return only a valid JSON object as defined by the response schema.',
            },
          ],
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
            },
            propertyOrdering: ['suggestions'],
          },
        },
      },
    });

    if (!response.text) {
      return null;
    }

    const parsedRes = JSON.parse(response.text);
    return parsedRes[0].suggestions as string[];
  } catch (error) {
    console.error(error);
  }
};

export const getProductSuggestionFromAI = async (query: string) => {
  const prompt = `You are an AI designed to recommend products exclusively based on the data contained within the following array of JSON objects. Do not use any external knowledge, assumptions, or information beyond what is provided in this array. Analyze the user's query to identify relevant products from the array that best match their needs, such as features, category, brand, or description. Recommend only the most suitable products (1-3 at most) from the array, and for each recommendation, explain why it is recommended, drawing directly from the product's name, description, price, or other attributes in the array. Structure your response as a JSON object with a "products" array, where each product has a "name" (the product_name from the array) and a "reason" (the explanation). If the user's query cannot be matched to any products in the array, return an empty array []. Here is the array: ${contextData}

    User query: ${query}
    Respond only with the JSON object as specified.
    `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text: 'You must strictly adhere to the instructions and return only a valid JSON object as defined by the response schema.',
            },
          ],
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              products: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  // required: ["name", "reason"],
                  propertyOrdering: ['name', 'reason'],
                },
              },
            },
            // required: ["products"],
            propertyOrdering: ['products'],
          },
        },
      },
    });

    if (!response.text) {
      return null;
    }

    const parsedRes = JSON.parse(response.text);
    return parsedRes[0].products as { name: string; reason: string }[];
  } catch (error) {
    console.error(error);
  }
};
