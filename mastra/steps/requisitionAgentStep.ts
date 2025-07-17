import { createStep } from '@mastra/core/workflows';
import { createRequisitionTool } from '../tools/createRequisitionTool';

export const requisitionAgentStep = createStep({
  id: 'requisition-agent-step',
  description: 'Step simulating the requisition agent logic, currently passes input through',
  inputSchema: createRequisitionTool.inputSchema,
  outputSchema: createRequisitionTool.inputSchema, // output matches input for next step
  execute: async ({ inputData }) => {
    // Placeholder: pass input through as output
    return inputData;
  },
});
