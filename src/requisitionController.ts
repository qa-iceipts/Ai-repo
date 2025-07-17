import { mastra } from "./app";
import axios from "axios";
import type { Request, Response } from "express";

async function getEmployeeData(employeeId: string) {
  const res = await axios.get(`${process.env.EMPLOYEE_SERVICE_URL}/employees/${employeeId}`);
  return res.data;
}

export async function createRequisitionController(req: Request, res: Response) {
  try {
    const { employeeId, jobData } = req.body;

    const employee = await getEmployeeData(employeeId);

    const payload = {
      jobData: {
        ...jobData,
        departmentId: employee.departmentId,
        shiftId: employee.shiftId,
        managerId: employee.managerId,
        recruiterId: employee.recruiterId
      },
      skills: employee.skills.map((s: any) => s.id),
      benefits: employee.benefits.map((b: any) => b.id)
    };

    const workflow = mastra.getWorkflow("job-requisition-workflow");
    const run = await workflow.createRunAsync();
    const result = await run.start({ inputData: payload });

    res.json({ success: true, result });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
}
