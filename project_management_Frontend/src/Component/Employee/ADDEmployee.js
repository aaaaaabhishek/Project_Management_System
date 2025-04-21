
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
 
const ADDEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    phone: "",
    email: "",
    designation: "",
    salary: "",
    location: "",
    joiningDate: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // Check if all fields are filled with proper validation
    for (let key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all fields", { position: "top-center" });
        return;
      }
    }
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address", { position: "top-center" });
      return;
    }
 
    // Phone number validation
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number", { position: "top-center" });
      return;
    }
 
    fetch("http://localhost:8081/createEmployee", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 201) {
          if (data.message === "Validation failed") {
            //All field's validation alert
            // let messages = Object.values(data.errors).join("\n"); // alert(messages);
            Object.values(data.errors).forEach(error => toast.error(error,{position:"top-center"}));
            return false;
            // throw new Error(messages);
          } else {
            //EmpId and phone no. validation failed alert
            toast.error(data.message, { position: "top-center" });
            return false;
          }
        }
        toast.success("Employee added successfully.", { position: "top-center" });
        // Clear form after submission
        setFormData({
          empId: "",
          empName: "",
          phone: "",
          email: "",
          designation: "",
          salary: "",
          location: "",
          joiningDate: "",
        });
      })
      .catch((errors) => {
        toast.error('Failed to connect with server', { position: "top-center" });
      });
  };
 
  return (
    <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
 
      <Container className="mt-5" style={{ padding: "20px", borderRadius: "20px", color: "white", maxWidth: "600px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
        <h2 className="text-center mb-4">Add Employee</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="empId">Employee ID</Label>
            <Input type="text" name="empId" id="empId" value={formData.empId} onChange={handleChange}
              placeholder="Enter the employee ID" />
          </FormGroup>
 
          <FormGroup>
            <Label for="empName">Employee Name</Label>
            <Input type="text" name="empName" id="empName" value={formData.empName} onChange={handleChange}
              placeholder="Enter the employee name" />
          </FormGroup>
 
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange}
              placeholder="Enter the phone" />
          </FormGroup>
 
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
              placeholder="Enter the email" />
          </FormGroup>
 
          <FormGroup>
            <Label for="designation">Designation</Label>
            <Input type="text" name="designation" id="designation" value={formData.designation} onChange={handleChange}
              placeholder="Enter the designation" />
          </FormGroup>
 
          <FormGroup>
            <Label for="salary">Salary</Label>
            <Input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange}
              placeholder="Enter the salary" />
          </FormGroup>
 
          <FormGroup>
            <Label for="location">Location</Label>
            <Input type="text" name="location" id="location" value={formData.location} onChange={handleChange}
              placeholder="Enter the location" />
          </FormGroup>
 
          <FormGroup>
            <Label for="joiningDate">Joining Date</Label>
            <Input type="date" name="joiningDate" id="joiningDate" value={formData.joiningDate} onChange={handleChange}
              placeholder="Enter the joining date" />
          </FormGroup>
          <FormGroup>
 
          </FormGroup>
          <Button onClick={() => { navigate(-1) }} style={{ marginRight: "5px" }}>Back</Button>
          <Button color="primary">Submit</Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};
 
export default ADDEmployee;