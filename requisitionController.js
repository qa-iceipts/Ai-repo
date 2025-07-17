const axios = require('axios');

async function getEmployeeData(employeeId) {
    const res = await axios.get(`http://employee-service.local/api/employees/${employeeId}`);
    return res.data;
}

async function createRequisition(input) {
    const employee = await getEmployeeData(input.employeeId);

    const requisition = {
        title: input.title,
        departmentId: employee.departmentId,
        shiftId: employee.shiftId,
        managerId: employee.managerId,
        recruiterId: employee.recruiterId,
        skills: employee.skills.map(s => s.id),
        benefits: employee.benefits.map(b => b.id)
    };

    // Placeholder: simulate saving to DB or calling Mastra
    console.log("Requisition created:", requisition);
    return requisition;
}

module.exports = { createRequisition };