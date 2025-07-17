
// import { z } from "zod";
// import fetch from "node-fetch";

// export const createRequisitionTool = createTool({
//   id: "create-requisition",
//   description: "Call internal API to create requisition",
//   inputSchema: z.object({
//     jobData: z.object({ /* ...fields... */ }),
//     skills: z.array(z.string()),
//     benefits: z.array(z.string())
//   }),
//   outputSchema: z.object({
//     requisitionId: z.string(),
//     status: z.string()
//   }),
//   execute: async ({ context }) => {
//     const resp = await fetch(`${process.env.BACKEND_URL}/api/internal/requisitions`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(context),
//     });
//     if (!resp.ok) throw new Error(await resp.text());
//     return resp.json();
//   }
// });


import { z } from "zod";
import axios from "axios";
import { createTool } from "@mastra/core/tools";
export const createRequisitionTool =  createTool({
  name: "createRequisitionTool",
  description: "Create job requisition by calling backend",
  inputSchema: z.object({
    jobData: z.object({
      title: z.string(),
      department: z.string(),
      location: z.string(),
    }),
    skills: z.array(z.string()),
    benefits: z.array(z.string()),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    id: z.string().optional(),
    message: z.string().optional(),
  }),
  async execute({ input }) {
    const response = await axios.post(process.env.BACKEND_API_URL!, input);
    return response.data;
  },
});
