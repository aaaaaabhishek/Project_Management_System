// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button, Table, Input } from "reactstrap";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function UpdateManager() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const manager = location.state;

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedManager, setEditedManager] = useState(manager);
//  const handleSuccesfulSubmission=()=>{
//   toast.success("Manager is updated Succesfully",{
//     position:"top-center"
//   });
//  };

//   if (!manager) {
//     return <h2>No project details found!</h2>;
//   }

//   // Enable edit mode
//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedManager({ ...editedManager, [name]: value });
//   };

//   // Handle project change
//   const handleProjectChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedManagers = editedManager.projects.map((project, i) => {
//       if (i === index) {
//         return { ...project, [name]: value };
//       }
//       return project;
//     });
//     setEditedManager({ ...editedManager, projects: updatedManagers });
//   };

//   // Save changes
//   async function handleSave() {
//     try {
//       const response = await fetch('http://localhost:8081/api/changeManagerDetails', {
//         method: "PUT",
//         credentials:"include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedManager),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to save changes");
//       }
//       handleSuccesfulSubmission();
//       setIsEditing(false);
//       // alert("Successfully saved");
//       console.log("Updated manager:", editedManager);
//     } catch (error) {
//       console.error("Error occurred:", error);
//       toast.error("Error occured",error,{
//         position:"top-center"
//       });
//           // alert("Error occurred: " + error.message);
//     }
//   }

//   return (
//     <div>
//       <h2>Manager Details</h2>
//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>Manager ID</th>
//             <th>Manager Name</th>
//             <th>Projects</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={{ cursor: "pointer", color: "blue" }} onClick={handleEditClick}>
//               {editedManager.managerId}
//             </td>
//             <td>
//               {isEditing ? (
//                 <Input type="text" name="managerName" value={editedManager.managerName} onChange={handleChange} />
//               ) : (
//                 editedManager.managerName
//               )}
//             </td>
//             <td>
//               {editedManager.projects && editedManager.projects.length > 0 ? (
//                 editedManager.projects.map((project, i) => (
//                   <div key={i}>
//                     {isEditing ? (
//                       <>
//                           <label>Project-{i+1}</label>
//                       <div>
//                       <label>ProjectId</label>
//                         <Input
//                           type="text"
//                           name="projectId"
//                           value={project.projectID}
//                           onChange={(e) => handleProjectChange(i, e)}
//                           placeholder="Project ID"
//                           className="mb-1"
//                         />
//                         </div>
//                         <div>
//                         <label>ProjectName</label>

//                         <Input
//                           type="text"
//                           name="projectName"
//                           value={project.projectName}
//                           onChange={(e) => handleProjectChange(i, e)}
//                           placeholder="Project Name"
//                         />
//                         </div>
//                       </>
                      
//                     ) : (
//                       <div className="project-get" style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px", paddingRight: "60px" }}>

//                          <span>{project.projectID}</span>
//                         <span>{project.projectName}</span>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <div>No projects assigned</div>
//               )}
//             </td>
//             <td>
//               {isEditing ? (
//                 <Button color="success" onClick={handleSave}>Save</Button>
//               ) : (
//                 <Button color="warning" onClick={handleEditClick}>Edit</Button>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </Table>
//       <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
//       <ToastContainer/>
//     </div>
//   );
// }

// export default UpdateManager;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button,NavbarBrand } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function UpdateManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const manager = location.state;
 
  const [isEditing, setIsEditing] = useState(false);
  const [editedManager, setEditedManager] = useState(manager);
 
  const handleSuccesfulSubmission = () => {
    toast.success("Manager is updated successfully", {
      position: "top-center"
    });
  };
 
  if (!manager) {
    return <h2>No manager details found!</h2>;
  }
 
  // Enable edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };
 
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedManager({ ...editedManager, [name]: value });
  };
 
  // Handle project change
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedManagers = editedManager.projects.map((project, i) => {
      if (i === index) {
        return { ...project, [name]: value };
      }
      return project;
    });
    setEditedManager({ ...editedManager, projects: updatedManagers });
  };
 
  // Save changes
  async function handleSave() {
    try {
      const response = await fetch('http://localhost:8081/api/changeManagerDetails', {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedManager),
      });
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      handleSuccesfulSubmission();
      setIsEditing(false);
      console.log("Updated manager:", editedManager);
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
      <Card style={{ width: "35%", padding: "15px", borderRadius: "20px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))", color: "white", marginBottom: "20px" ,marginTop:"70px"}}>
        <CardBody>
          <CardTitle className="text-center mb-4" tag="h5" style={{ fontSize: "24px" }}>Manager Details</CardTitle>
          <Form>
            <FormGroup>
              <Label for="managerId">Manager ID</Label>
              <Input type="text" name="managerId" id="managerId" value={editedManager.managerId || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="managerName">Manager Name</Label>
              <Input type="text" name="managerName" id="managerName" value={editedManager.managerName || ''} onChange={handleChange} readOnly={!isEditing} />
            </FormGroup>
            {editedManager.projects && editedManager.projects.length > 0 ? (
              editedManager.projects.map((project, i) => (
                <div key={i}>
                  <Label>Project-{i + 1}</Label>
                  <FormGroup>
                    <Label for={`projectId-${i}`}>Project ID</Label>
                    <Input
                      type="text"
                      name="projectId"
                      id={`projectId-${i}`}
                      value={project.projectID}
                      onChange={(e) => handleProjectChange(i, e)}
                      placeholder="Project ID"
                      className="mb-1"
                      readOnly={!isEditing}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for={`projectName-${i}`}>Project Name</Label>
                    <Input
                      type="text"
                      name="projectName"
                      id={`projectName-${i}`}
                      value={project.projectName}
                      onChange={(e) => handleProjectChange(i, e)}
                      placeholder="Project Name"
                      readOnly={!isEditing}
                    />
                  </FormGroup>
                </div>
              ))
            ) : (
              <div>No projects assigned</div>
            )}
            <div className="d-flex justify-content-between">
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
 
export default UpdateManager;