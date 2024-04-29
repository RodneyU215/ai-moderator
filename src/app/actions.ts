"use server";
import OpenAI from "openai";
import { wrapOpenAI, traced, initLogger, currentLogger } from "braintrust";
import { log } from "@/utils";

export type ModerationResults =
  | { moderation: OpenAI.Moderations.Moderation }
  | { error: string };

initLogger({
  projectName: "AI-Moderator",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export async function checkPost(post: string): Promise<ModerationResults> {
  // TODO: Attempting to wrap the OpenAI object to add tracing
  // No logs are displayed on the BrainTrust dashboard
  const openai = wrapOpenAI(
    new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  );

  return traced(
    async (span) => {
      try {
        const moderation = await openai.moderations.create({
          input: post,
        });
        const output = moderation["results"][0];
        span.log({ input: post, output });
        log("INFO", "Successfully checked post", { input: post, output });
        return { moderation: output };
      } catch (error: any) {
        log("ERROR", "An error occurred while checking the post", { error });
        return {
          error: "An error occurred while checking the post. Please try again.",
        };
      }
    },
    {
      name: "checkPost",
    }
  );
}
