// // mastra/agents/requisitionAgent.ts
// import { Agent } from "@mastra/core/agent";
// import { google } from "@ai-sdk/google";
// import { createRequisitionTool } from "../tools/createRequisitionTool";
// import { createStep, createWorkflow } from '@mastra/core/workflows';
// import { z } from 'zod';
// // Choose available Gemini model
// const geminiModel = google("gemini-2.5-pro");
// // optionally pass providerOptions if needed

// });
// export const requisitionAgent = createStep({
//   id: 'requisitionAgent',
//   description: "Enrich or validate job requisition details with Google Gemini",
//   inputSchema: createRequisitionTool.inputSchema,
//   outputSchema: z.object({
//     activities: z.string(),
//   }),
//   execute: async ({ inputData, mastra }) => {
//     // return requisitionAgent.generate(inputData);
//     return {
//       activities: 'Hello World',
//     }
//   },
// });
// export const requisitionAgent = createStep({
//   id: 'requisition-agent',
//   description: "Enrich or validate job requisition details with Google Gemini",
//   inputSchema: createRequisitionTool.inputSchema,
//   outputSchema: createRequisitionTool.inputSchema,
//   execute: async ({ inputData }) => {
//     // You can run AI enrichment or validation logic using Gemini here
//     // For now, just pass through input
//     return inputData;
//   },
// });

import { Agent } from "@mastra/core/agent";
import { createRequisitionTool } from "../tools/createRequisitionTool";
import { google } from "@ai-sdk/google";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

const geminiModel = google("gemini-1.5-pro");

export const requisitionAgent = new Agent({
  name: "Requisition Agent",
  instructions: `
    You are an intelligent HR assistant that helps users create job requisitions efficiently.

    - Ask relevant questions to collect requisition details (e.g., job title, department, location, job type).
    - Validate each input based on expected formats or available options.
    - Once all required fields are collected, call the 'createRequisitionTool'.
    - Be professional, concise, and helpful.
  `,
  model: geminiModel,
  tools: { createRequisitionTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});
