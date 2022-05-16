import { CardDetails, OpenAiResponse } from "./types.ts";

declare const OPENAI_API_KEY: string;

export const promptStarter =
  "Write a creative summary for the following credit card to educate potential customers:";

// deno-lint-ignore no-explicit-any
export const generateCardDescription = async (input: any): Promise<string> => {
  if (typeof input !== "string") {
    return "";
  } else {
    const cardDetails = parseCreditCardDetails(input);
    return await fetchDescription(cardDetails);
  }
};

export const parseCreditCardDetails = (input: string): CardDetails => {
  const cardParts = input.split("|");
  return {
    name: cardParts[0],
    c_annualFee: cardParts[1],
    c_cardType: cardParts[2],
    c_introOffer: cardParts[3],
    c_rewardsDetails: cardParts[4],
  };
};

export const fetchDescription = async (
  cardDetails: CardDetails
): Promise<string> => {
  const prompt =
    `${promptStarter}\n\n` +
    `Credit Card Name: ${cardDetails.name}\n` +
    `Annual Fee: ${cardDetails.c_annualFee}\n` +
    `Card Type: ${cardDetails.c_cardType}\n` +
    `Intro Offer: ${cardDetails.c_introOffer}\n` +
    `Rewards Details: ${cardDetails.c_rewardsDetails}`;

  const response = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-002/completions",
    {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        prompt,
        temperature: 0.6,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    }
  );

  const openAiResponse: OpenAiResponse = await response.json();
  return openAiResponse?.choices[0].text ?? "";
};
