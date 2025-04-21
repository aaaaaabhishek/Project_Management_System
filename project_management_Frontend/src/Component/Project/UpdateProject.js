
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button,NavbarBrand } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function UpdateProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state;
 
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
 
    const handleSuccesfulSubmission = () => {
      toast.success("Project  is updated successfully", {
        position: "top-center",
        autoClose:3000,
      });
    };
  if (!project) {
    return <h2>No project details found!</h2>;
  }
 
  // Enable edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };
 
  // Handle input change
  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };
 
  // Save changes
  async function handleSave() {
    try {
      const response = await fetch('http://localhost:8081/api/changeProject', {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProject),
      });  
    if (!response.ok) {
            throw new Error("Failed to save changes");
          }
          handleSuccesfulSubmission();
          setIsEditing(false);
          console.log("Updated project:", editedProject);
        } catch (error) {
          console.error("Error occurred:", error);
          toast.error("Error occurred: " + error.message, {
            position: "top-center"
          });
    }
  }
 
  return (
    <div style={{ backgroundColor: "rgba(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <NavbarBrand href="#" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ width: "200px", height: "50px", filter: "brightness(20)", color: "white" }}
        />
      </NavbarBrand>
      <Card style={{ width: "30%", padding: "20px",borderRadius:"20px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))", color: "white",marginBottom:"20px" }}>
        <CardBody>
          <CardTitle className="text-center mb-4" tag="h5" style={{ fontSize: "24px" }}>Project Details</CardTitle>
          <Form>
            <FormGroup>
              <Label for="projectID">Project ID</Label>
              <Input type="text" name="projectID" id="projectID" value={editedProject.projectID || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="projectName">Project Name</Label>
              <Input type="text" name="projectName" id="projectName" value={editedProject.projectName || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input type="date" name="startDate" id="startDate" value={editedProject.startDate || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input type="date" name="endDate" id="endDate" value={editedProject.endDate || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
             <FormGroup>
               <Label for="cost">Cost</Label>
              <Input type="text" name="cost" id="cost" value={editedProject.cost || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            <FormGroup>
              <Label for="projectType">Project Type</Label>
              <Input type="text" name="projectType" id="projectType" value={editedProject.projectType || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            <FormGroup>
              <Label for="manager">Manager</Label>
              <Input type="text" name="manager" id="manager" value={editedProject.managerId || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            <div className="d-flex justify-content-between" style={{}}>
            <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
              {isEditing ? (
                <Button color="success" onClick={handleSave}>Save</Button>
              ) : (
                <Button color="warning" onClick={handleEditClick}>Edit</Button>
              )}
             
            </div>
          </Form>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
}
 
export default UpdateProject