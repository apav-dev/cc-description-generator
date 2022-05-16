export interface CardDetails {
  name?: string;
  c_annualFee?: string;
  c_cardType?: string;
  c_introOffer?: string;
  c_rewardsDetails?: string;
}

export interface OpenAiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs?: number;
    finish_reason?: string;
  }[];
}
