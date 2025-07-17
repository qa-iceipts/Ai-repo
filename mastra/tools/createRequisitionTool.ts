
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
// export const createRequisitionTool = createTool({

//   name: "create-RequisitionTool",
//   description: "Creates a job requisition by calling the backend API with job details, skills, and benefits.",
//   inputSchema: z.object({
//     jobData: z.object({
//       title: z.string().min(1, "Job title is required"),
//       department: z.string().min(1, "Department is required"),
//       location: z.string().min(1, "Location is required"),
//     }),
//     skills: z.array(z.string()).min(1, "At least one skill is required"),
//     benefits: z.array(z.string()).min(1, "At least one benefit is required"),
//   }),

//   outputSchema: z.object({
//     success: z.boolean(),
//     id: z.string().optional(),
//     message: z.string().optional(),
//   }),

//   // execute: async ({ input }) {
//   //   try {
//   //     const response = await axios.post(
//   //       `${process.env.BACKEND_API_URL}/requisitions`,
//   //       input
//   //     );
//   //     return response.data;
//   //   } catch (error) {
//   //     return {
//   //       success: false,
//   //       message: error?.response?.data?.message || "Failed to create requisition",
//   //     };
//   //   }
//   // },
// });

import axios from "axios";
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';


export const createRequisitionTool = createTool({
  id: 'create-RequisitionTool',
  description: 'Creates a job requisition by calling the backend API with job details, skills, and benefits.',
  inputSchema: z.object({
    obData: z.object({
      title: z.string().min(1, "Job title is required"),
      department: z.string().min(1, "Department is required"),
      location: z.string().min(1, "Location is required"),
    }),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    id: z.string().optional(),
    message: z.string().optional()
  }),
  execute: async ({ context }) => {
    return await createRequisitions(context);
  }
});

const createRequisitions = async (inputData:any) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/requisitions`,
      inputData
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error || "Failed to create requisition",
    };
  }
};
