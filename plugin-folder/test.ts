// deno-lint-ignore-file no-var
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { generateCardDescription, parseCreditCardDetails } from "./mod.ts";

declare global {
  var OPENAI_API_KEY: string;
}

const envVars = config();
globalThis.OPENAI_API_KEY = envVars.OPENAI_API_KEY;

const sampleInput =
  "Endeavor Rewards Card|$100|Travel|50000 points|3x points on travel purchases, 2x points on dining, 2x points on shopping";
const sampleCardDetails = {
  name: "Endeavor Rewards Card",
  c_annualFee: "$100",
  c_cardType: "Travel",
  c_introOffer: "50000 points",
  c_rewardsDetails:
    "3x points on travel purchases, 2x points on dining, 2x points on shopping",
};

Deno.test("Test parseCreditCard", () => {
  assertEquals(parseCreditCardDetails(sampleInput), sampleCardDetails);
});

Deno.test("Test generateCardDescription", async () => {
  const description = await generateCardDescription(sampleInput);
  console.log(description);
});
