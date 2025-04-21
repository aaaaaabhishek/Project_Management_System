import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button,NavbarBrand} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
 
function GetProjectById() {
  const [project, setProject] = useState({});
  const { projectId } = useParams();
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate(`/getProjectById/${project.projectID}/modify`, { state: project });
  };
 
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/getProjectById/${projectId}`,{
        credentials:"include"
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const newProject = data.content || data;
      setProject(newProject);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
 
  useEffect(() => {
    getData();
  }, [projectId]);
 
  return (
   
    <div style={{ backgroundColor: "rgba(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <NavbarBrand href="#" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ width: "200px", height: "50px", filter: "brightness(20)", color: "white" }}
        />
      </NavbarBrand>
      <Card style={{ width: "30%", padding: "20px", borderRadius: "20px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))", color: "white" }}>
        <CardBody>
        <CardTitle className="text-center mb-4" tag="h5" style={{ fontSize: "30px" }}>Project Details</CardTitle>
          <Form>
            <FormGroup>
              <Label for="projectID">ProjectID</Label>
              <Input type="text" name="projectID" id="projectID" value={project.projectID || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="projectName">ProjectName</Label>
              <Input type="text" name="projectName" id="projectName" value={project.projectName || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">StartDate</Label>
              <Input type="text" name="startDate" id="startDate" value={project.startDate || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">EndDate</Label>
              <Input type="text" name="endDate" id="endDate" value={project.endDate || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="cost">Cost</Label>
              <Input type="text" name="cost" id="cost" value={project.cost || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="projectType">ProjectType</Label>
              <Input type="text" name="projectType" id="projectType" value={project.projectType || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="managerId">Manager</Label>
              <Input type="text" name="managerId" id="managerId" value={project.managerId || ''} readOnly />
            </FormGroup>
            <div className="d-flex justify-content-between"style={{top:"20px"}} >
            <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
            <Button color="primary"  onClick={handleClick}> Modify </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
 
export default GetProjectById;