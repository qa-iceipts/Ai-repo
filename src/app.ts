import express from "express";
import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { requisitionWorkflow } from "../mastra/workflows/requisitionWorkflow";

export const mastra = new Mastra({
  workflows: { requisitionWorkflow },
  logger: new PinoLogger({ name: "requisition-service", level: "info" }),
});

import { createRequisitionController } from "./requisitionController";

const app = express();
app.use(express.json());

app.post("/requisition", createRequisitionController);

app.listen(3000, () => console.log("Listening on port 3000"));
