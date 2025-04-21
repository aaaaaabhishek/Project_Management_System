// import React, { useEffect, useState } from "react";
// import { Table, Button } from "reactstrap";
// import { useNavigate, useParams } from "react-router-dom";

// function GetManagerById() {
//   const [manager, setManager] = useState(null);
//   const { managerId } = useParams(); 
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/getManagerById/' + manager.managerId + '/modify', { state: manager });
//   };

//   const getData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8081/api/getManagerById/${managerId}`
//       ,
//       {
//         credentials:"include"
//       }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setManager(data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [managerId]);

//   if (!manager) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ backgroundColor: "rgba(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
//       <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingLeft: "40px" ,paddingRight:"40px"}}>
//         <Table striped bordered>
//           <thead>
//             <tr>
//               <th>Manager ID</th>
//               <th>Manager Name</th>
//               <th>Projects</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{manager.managerId}</td>
//               <td>{manager.managerName}</td>
//               <td>
//                 {manager.projects.length > 0 && (
//     <div style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px",fontWeight:"bold"}}>
//       <label>ProjectID</label>
//       <label>Project</label>
//     </div>
//   )}
//                 {manager.projects && manager.projects.length > 0 ? (
//                   manager.projects.map((project, i) => (

// <div key={i} style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px"}}>
//       <span>{project.projectID}</span>
//       <span>{project.projectName}</span>
//     </div>

//                   ))
//                 ) : (
//                   <div>No projects assigned</div>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//       <Button color="primary" onClick={() => navigate(-1)}>Back</Button>

//       <div className="d-flex justify-content-between mt-3">
//         <Button color="secondary" onClick={handleClick}>
//           Modify
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default GetManagerById;
import React, { useEffect, useState } from "react";
import { Table, Button,NavbarBrand } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
 
function GetManagerById() {
  const [manager, setManager] = useState(null);
  const { managerId } = useParams();
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate('/getManagerById/' + manager.managerId + '/modify', { state: manager });
  };
 
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/getManagerById/${managerId}`,{
        credentials:"include"
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setManager(data);
    } catch (error) {
      console.log("error", error);
    }
  };
 
  useEffect(() => {
    getData();
  }, [managerId]);
 
  if (!manager) {
    return <div>Loading...</div>;
  }
 
  return (
    <div style={{ backgroundColor: "rgba(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
        <div>
        <NavbarBrand href="#" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ width: "200px", height: "50px", filter: "brightness(20)", color: "white" }}
        />
      </NavbarBrand>
      </div>
      <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "70px", paddingLeft: "40px" ,paddingRight:"40px"}}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Manager ID</th>
              <th>Manager Name</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{manager.managerId}</td>
              <td>{manager.managerName}</td>
              <td>
                {manager.projects.length > 0 && (
    <div style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px",fontWeight:"bold"}}>
      <label>ProjectID</label>
      <label>Project</label>
    </div>
  )}
                {manager.projects && manager.projects.length > 0 ? (
                  manager.projects.map((project, i) => (
 
<div key={i} style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px"}}>
      <span>{project.projectID}</span>
      <span>{project.projectName}</span>
    </div>
 
                  ))
                ) : (
                  <div>No projects assigned</div>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-between mt-3" style={{top:"10px",marginRight:"40px",marginLeft:"40px"}}>
      <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
        <Button color="primary"  onClick={handleClick}> Modify </Button>
      </div>
    </div>
  );
}
 
export default GetManagerById;