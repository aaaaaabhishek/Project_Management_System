import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  NavbarBrand
} from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddManager() {
  const [managerform, setManagerform] = useState({
    managerId: "",
    managerName: "",
    // projects: [{ projectID: "", projectName: "" }]
    projects: [{ projectID: ""}]

  });
  const [manager, setManager] = useState([]);

  const handleSuccesfulSubmission = () => {
    toast.success("Manager is added successfully", {
      position: "top-center"
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/createManager", {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(managerform)
      });
      if (!response.ok) {
        throw new Error("Internal error");
      }
      handleSuccesfulSubmission();
      const manager = await response.json();
      setManager(manager);
      setManagerform({
        managerId: "",
        managerName: "",
        projects: [{ projectID: "", projectName: "" }]
      });
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerform({
      ...managerform,
      [name]: value
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = managerform.projects.map((project, i) => {
      if (i === index) {
        return { ...project, [name]: value };
      }
      return project;
    });
    setManagerform({
      ...managerform,
      projects: newProjects
    });
  };

  const addProject = () => {
    setManagerform({
      ...managerform,
      projects: [...managerform.projects, { projectID: "", projectName: "" }]
    });
  };

  const removeProject = (index) => {
    const newProjects = [...managerform.projects];
    newProjects.splice(index, 1);
    setManagerform({ ...managerform, projects: newProjects });
  };

  return (
    <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <NavbarBrand href="#" style={{ position: "absolute", top: "10px", left: "600px", display: "flex", justifyContent: "center", marginLeft: "250px" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ width: "200px", height: "50px", filter: "brightness(20)", color: "white" }}
        />
      </NavbarBrand>
      <Container style={{ padding: "30px", borderRadius: "20px", color: "white", maxWidth: "600px", paddingTop: "20px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center mb-4">Add Manager</h2>
            <Form onSubmit={handleSubmit} style={{ width: "100%", padding: "20px", borderRadius: "10px" }}>
              <FormGroup>
                <Label for="managerId">Manager ID</Label>
                <Input
                  type="number"
                  name="managerId"
                  id="managerId"
                  placeholder="Enter the manager id"
                  value={managerform.managerId}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="managerName">Manager Name</Label>
                <Input
                  type="text"
                  name="managerName"
                  id="managerName"
                  placeholder="Enter the manager name"
                  value={managerform.managerName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                {managerform.projects.map((project, index) => (
                  <div key={index} className="mb-2">
                    <Label>Project {index + 1}</Label>
                    <Input
                      type="text"
                      name="projectID"
                      placeholder="Project ID"
                      value={project.projectID}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="mb-1"
                    />
                    {/* <Input
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      value={project.projectName}
                      onChange={(e) => handleProjectChange(index, e)}
                    /> */}
                    <Button color="danger" type="button" onClick={() => removeProject(index)}>
                      Remove Project
                    </Button>
                  </div>
                ))}
                <Button color="secondary" type="button" onClick={addProject}>
                  Add Project
                </Button>
              </FormGroup>
              <Button color="primary" type="submit" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default AddManager;