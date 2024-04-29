import { expect, test, beforeAll, describe } from "vitest";
import { JSONDiff, Score } from "autoevals";

require("dotenv").config({ path: ".env.test" });

import { checkPost } from "../app/actions";

async function runCheckPost(
  input: string,
  expectedResults: any
): Promise<Score> {
  const moderationResults = await checkPost(input);

  return await JSONDiff({
    output: moderationResults,
    expected: expectedResults,
  });
}

// TODO: These tests don't work properly due to issues calling the OpenAI API.
// We may have to instantiate the OpenAI object differently: new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
// Tabling this for now.
describe.each([
  { post: "test post", expectedResults: {}, score: 1 },
  { post: "test post two", expectedResults: {}, score: 1 },
])("checkPost", ({ post, expectedResults }) => {
  test(`returns ${expectedResults}`, async () => {
    const score = await runCheckPost(post, expectedResults);
    expect(score).toBe(1);
  });
});
