import { createWorkflow } from "@mastra/core/workflows";
import { createRequisitionTool } from "../tools/createRequisitionTool";
import { createRequisitionStep } from "../steps/createRequisitionStep";
import { requisitionAgentStep } from "../steps/requisitionAgentStep";

const jobRequisitionWorkflow = createWorkflow({
  id: 'job-requisition-workflow',
  inputSchema: createRequisitionTool.inputSchema,
  outputSchema: createRequisitionTool.outputSchema,
})
  .then(requisitionAgentStep) // ✅ wrapped agent as step
  .then(createRequisitionStep); // ✅ backend call step

jobRequisitionWorkflow.commit();

export { jobRequisitionWorkflow };
