import { Eval } from "braintrust";
import { JSONDiff } from "autoevals";

import { checkPost } from "@/app/actions";

// TODO: Figure out how to pull my dataset down from BrainTrust and use it inline with my tests?
Eval("Testing checkPost", {
  data: () => {
    return [
      {
        input: "Foo",
        expected: {
          moderation: {
            flagged: false,
            categories: {
              hate: false,
              sexual: false,
              violence: false,
              "self-harm": false,
              harassment: false,
              "sexual/minors": false,
              "hate/threatening": false,
              "self-harm/intent": false,
              "violence/graphic": false,
              "harassment/threatening": false,
              "self-harm/instructions": false,
            },
            category_scores: {
              hate: 0.0019741321448236704,
              sexual: 0.0055162119679152966,
              violence: 0.0006461654556915164,
              "self-harm": 0.00013058612239547074,
              harassment: 0.002829661127179861,
              "sexual/minors": 0.0009856442920863628,
              "hate/threatening": 0.00004290016659069806,
              "self-harm/intent": 0.00011762003123294562,
              "violence/graphic": 0.00013664762082044035,
              "harassment/threatening": 0.00012844640878029168,
              "self-harm/instructions": 0.0007253502262756228,
            },
          },
        },
      },
    ];
  },
  task: checkPost,
  scores: [JSONDiff],
});
