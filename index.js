const express = require('express');
const { createRequisition } = require('./requisitionController');

const app = express();
app.use(express.json());

app.post('/requisition', async (req, res) => {
    try {
        const data = await createRequisition(req.body);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

import { requisitionWorkflow } from './mastra/workflows/requisitionWorkflow';

(async () => {
  const result = await requisitionWorkflow.run({
    jobData: {
      title: "Node.js Developer",
      department: "Engineering",
      location: "Remote",
    },
    skills: ["Node.js", "Express", "Sequelize"],
    benefits: ["Health Insurance", "Remote Work"]
  });
  console.log("Workflow Result:", result);
})();


app.listen(3000, () => console.log('Requisition service listening on port 3000'));