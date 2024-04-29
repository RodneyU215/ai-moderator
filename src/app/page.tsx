"use client";
import { useState } from "react";
import { checkPost, ModerationResults } from "@/app/actions";
import { classNames } from "@/utils";

export default function Home() {
  const [txt, setTxt] = useState("");
  const [results, setResults] = useState<ModerationResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!txt) return;
    setIsLoading(true);
    const r = await checkPost(txt.trim());
    setResults(r);
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col min-h-screen p-24 bg-gray-300 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Check my Txt</h1>
      <div className="flex">
        <div className="flex-1 space-y-10 divide-y divide-gray-900/10">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 h-full flex flex-col mr-8">
            <div className="px-4 py-6 sm:p-8">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Can I post this?
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={10}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setTxt(e.target.value)}
                    value={txt}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about anything you&apos;d like.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 mt-auto">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => txt.length > 1 && setTxt("")}
              >
                Clear
              </button>
              <button
                type="submit"
                className={classNames(
                  "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  !txt || isLoading
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600 cursor-pointer"
                )}
                disabled={!txt || isLoading}
                onClick={handleCheck}
              >
                {isLoading ? "Checking..." : "Check"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-96 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/10">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900">Results</h2>
            {results ? (
              <ResultsCard results={results as ModerationResults} />
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Add some text and tap &apos;Check&apos; to see if your content
                is good to post or not.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultsCard({ results }: { results: ModerationResults }) {
  if ("error" in results) {
    return <div className="text-red-600">{results.error}</div>;
  }

  const { flagged, categories, category_scores } = results.moderation;

  const renderCategory = (i: number, category: string, score: number) => {
    const scorePercentage = Math.round(score * 100);
    return (
      <div className="my-2" key={i}>
        <div className="flex justify-between">
          <span>{category.replace(/_/g, " ")}</span>
          <span>{scorePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`h-2.5 rounded-full ${
              scorePercentage > 75
                ? "bg-red-600"
                : scorePercentage > 50
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2
        className={`mt-2 text-lg font-bold ${
          flagged ? "text-red-600" : "text-green-600"
        }`}
      >
        {flagged ? "Content flagged as inappropriate." : "Content looks good."}
      </h2>
      <div className="mt-4">
        {Object.keys(categories).map((category, i) => {
          return renderCategory(
            i,
            category,
            category_scores[category as keyof typeof category_scores] as number
          );
        })}
      </div>
    </div>
  );
}
