import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Alert,
  NavbarBrand
} from "reactstrap";
 
function AddProject() {
  const [formData, setFormData] = useState({
    projectID: "",
    projectName: "",
    startDate: "",
    endDate: "",
    cost:"",
    projectType: "",
    managerId: ""
  });
  const [valid,isValid]=useState(false);
  const btnhandle = () => {
    console.log("done3");
    toast.success("Succesfully inserted Project", {
      position: "top-center",
    });
  };
  
  const navigate=useNavigate();
  const [error, setError] = useState({});
  const [data, setData] = useState({});
 
  async function handleSubmit(event) {
    event.preventDefault();
    if(formData.startDate>formData.endDate){
      toast.error("EndDate should be greater than Startdate",{
        position: "top-center",
    });
      return;
    }
    console.log(valid);
    
    if(!valid){
      toast.error("Invalid manager ID. Please enter a valid manager ID.", {
        position:"top-center"
      });
 return;
    }
    try {
      const response = await fetch("http://localhost:8081/api/createProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        
        if (Array.isArray(errorData)) {
          throw {
            status: response.status,
            message: errorData.join('\n')
          };
        }
       
        const message = errorData.error?.message || errorData.message || "Something went wrong";
       
        throw {
          status: response.status,
          message
        };
      }
      // submit popup button call
      btnhandle();

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error status",error.status);
      console.log("Error message",error.message);
      if(error.status===400){
        toast.error("Validation Error :"+error.message,{
          position: "top-center",
      });
        // alert("Validation Error :"+ error.message);
        
      }else if(error.status===500){
        toast.error("Internal server Error  :"+error.message,{
          position: "top-center",
      });
        // alert("Internal server Error  :"+error.message);

      }else{
        toast.error(`Error ${error.status}: ${error.message}`,{
          position: "top-center",
      });
        // alert(`Error ${error.status}: ${error.message}`);
      }

    setError(error.message);
    }
    finally{
      setFormData({
        projectID: "",
        projectName: "",
        startDate: "",
        endDate: "",
        cost:"",
        projectType: "",
        managerId: ""
      });}
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
async function managerIdCheck(){
  console.log(formData.managerId);
  
    try{
      const response = await fetch(`http://localhost:8081/api/getManagerById/${formData.managerId}`,{
        credentials:"include"
      });
      console.log("qoiqooq");
      if(!response.ok){
        console.log("tryryr");
        isValid(true);
      }
    }catch(error){
throw new Error("");
    }
  };

  useEffect(() => {
    if (formData.managerId) {
      const timer = setTimeout(managerIdCheck, 300); 
      return () => clearTimeout(timer); 
    }
  }, [formData.managerId]);

 
  return (
    <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <NavbarBrand href="#" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ width: "200px", height: "50px", filter: "brightness(20)", color: "white" }}
        />
      </NavbarBrand>
      <Container style={{ padding: "20px", borderRadius: "20px", color: "white", maxWidth: "600px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center mb-4">Add Project</h2>
            <Form onSubmit={handleSubmit} style={{ width: "100%", padding: "20px", borderRadius: "10px" }}>
              <FormGroup>
                <Label for="projectID">Project ID</Label>
                <Input
                  type="text"
                  name="projectID"
                  id="projectID"
                  placeholder="Enter the project id"
                  value={formData.projectID}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder="Enter the project name"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
              <Label for="cost">Cost</Label>
              <Input
                type="number"
                name="cost"
                id="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </FormGroup>
              <FormGroup>
                <Label for="projectType">Project Type</Label>
                <Input
                  type="text"
                  name="projectType"
                  id="projectType"
                  placeholder="Enter the project type"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="managerId">Manager ID</Label>
                <Input
                  type="text"
                  name="managerId"
                  id="managerId"
                  placeholder="Enter the manager id"
                  value={formData.managerId}
                  onChange={handleChange}
                />
              </FormGroup>
              <br></br>


              <Button color="primary" type="submit" block >
                Submit
              </Button>
              <Button color="primary" onClick={() => navigate(-1)}>Back</Button>

            </Form>
            {error.message && (
              <Alert color="danger" className="mt-3">
                {error.message}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}
export default AddProject;