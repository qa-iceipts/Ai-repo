import { createWorkflow } from "@mastra/core/workflows";
import { requisitionAgent } from "../agents/requisitionAgent";
import { createRequisitionTool } from "../tools/createRequisitionTool";

export const requisitionWorkflow = createWorkflow({
  id: "job-requisition-workflow",
  inputSchema: createRequisitionTool.inputSchema,
  outputSchema: createRequisitionTool.outputSchema,
})
  .then(requisitionAgent)
  .then(createRequisitionTool)
  .commit();
