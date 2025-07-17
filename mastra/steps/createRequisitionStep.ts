import { createStep, createWorkflow } from '@mastra/core/workflows';
import { createRequisitionTool } from '../tools/createRequisitionTool';
import axios from "axios";

export const createRequisitionStep = createStep({
    id: 'fetch-weather',
    description: 'Fetches weather forecast for a given city',
    inputSchema: createRequisitionTool.inputSchema,
    outputSchema: createRequisitionTool.outputSchema,
    execute: async ({ inputData }) => {
        const result = await createRequisitions(inputData);
        return result;
    },
});

const createRequisitions = async (context) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/requisitions`,
      location
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to create requisition",
    };
  }
};
// import { createStep } from '@mastra/core/workflows';
// import { createRequisitionTool } from '../tools/createRequisitionTool';

// export const createRequisitionStep = createStep({
//   id: 'create-requisition-step', // ✅ Must be `id`, not `name`
//   inputSchema: createRequisitionTool.inputSchema,
//   outputSchema: createRequisitionTool.outputSchema,
//   execute: async ({ input, tools }) => { // ✅ Must be `execute`, not `run`
//     const result = await tools.createRequisitionTool.invoke(input);
//     return result;
//   },
// });
