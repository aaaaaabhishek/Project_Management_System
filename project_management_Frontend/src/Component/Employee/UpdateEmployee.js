
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
 
function UpdateEmployee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    async function handleSearch() {
        try {
            const response = await fetch(`http://localhost:8081/getEmployee/${employeeId}`,
                {
                    credentials:"include"
                }
            );
            const data = await response.json();
            setEmployee(data);
        } catch (err) {
            toast.error("Failed to connect with server",{position:"top-center"});
        }
    }
    useEffect(() => {
        handleSearch();
    }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    }
    function handleSubmit(event){
        event.preventDefault();
        // Check if all fields are filled with proper validation
        for (let key in employee) {
            if (!employee[key]) {
            toast.error("Please fill all fields",{position:"top-center"});
            return;
            }
        }
        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(employee.email)) {
            toast.error("Please enter a valid email address",{position:"top-center"});
            return;
        }
        // Phone number validation
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(employee.phone)) {
            toast.error("Please enter a valid 10-digit phone number",{position:"top-center"});
            return;
        }
        // Submit form 
        fetch("http://localhost:8081/updateEmployee",{
            method: "PUT",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(employee)
        }).then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                if(data.message === "Validation failed"){
                    //All field's validation alert
                    // toast.error(Object.values(data.errors).join("\n"),{position:"top-center"})
                    Object.values(data.errors).forEach(error =>{
                        toast.error(error,{position:"top-center"});
                    });
                    return false;
                }else{
                    //EmpId and phone no. validation failed alert
                    toast.error(data.message,{position:"top-center"});
                    return false;
                }
            }
 
            toast.success("Employee Edited successfully.",{ position:"top-center"})
            // navigate(-1);
        })
        .catch(errors => {toast.error("Faild to connect with server",{position:"top-center"})})
    }
    return (
 
        <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
<Container className="mt-5" style={{ padding: "20px", borderRadius: "20px", color: "white", maxWidth: "600px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
<h2 className="text-center mb-4">Update Employee</h2>
<Form onSubmit={handleSubmit} >
<FormGroup>
<Label for="empId">Employee ID</Label>
<Input type="text" name="empId" id="empId" value={employee.empId || ''} disabled />
</FormGroup>
<FormGroup>
<Label for="empName">Employee Name</Label>
<Input type="text" name="empName" id="empName" value={employee.empName || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="phone">Phone</Label>
<Input type="text" name="phone" id="phone" value={employee.phone || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="email">Email</Label>
<Input type="email" name="email" id="email" value={employee.email || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="designation">Designation</Label>
<Input type="text" name="designation" id="designation" value={employee.designation || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="salary">Salary</Label>
<Input type="text" name="salary" id="salary" value={employee.salary || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="location">Location</Label>
<Input type="text" name="location" id="location" value={employee.location || ''} onChange={handleChange} />
</FormGroup>
<FormGroup>
<Label for="joiningDate">Joining Date</Label>
<Input type="date" name="joiningDate" id="joiningDate" value={employee.joiningDate || ''} onChange={handleChange} />
</FormGroup>
<div className="d-flex justify-content-between mt-3">
<Button onClick={() => { navigate(-1); }} style={{ marginRight: "5px" }}>Back</Button>
<Button color="success" type="submit">Save</Button>
</div>
</Form>
</Container>
<ToastContainer/>
 
        </div>
    );
}
 
export default UpdateEmployee;