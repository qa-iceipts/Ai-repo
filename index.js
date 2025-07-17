const express = require("express");
const dotenv = require("dotenv");
const { createRequisition } = require("./mastra/tools/createRequisitionTool");

dotenv.config();

const app = express();
app.use(express.json());

app.post("/requisition", async (req, res) => {
try {
const data = await createRequisition(req.body);
res.status(200).json({ success: true, data });
} catch (error) {
console.error("Error creating requisition:", error);
res.status(500).json({ success: false, message: "Failed to create requisition" });
}
});

app.listen(3000, () => console.log("Requisition service running on port 3000"));