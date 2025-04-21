// import React, { useState } from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarToggler,
//   Collapse,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
//   Button,
//   Row,
//   Col
// } from "reactstrap";
// import { Menu, X, ChevronDown, ChevronUp,LogOut,toast } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("Welcome");
//   const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
//   const [showManagerOptions, setShowManagerOptions] = useState(false);
//   const [showProjectDetails, setShowProjectDetails] = useState(false);
//   const navigate = useNavigate();
//   // async function Call() {
//   //   console.log("call");
    
//   //   try {
//   //     const response = await fetch('http://localhost:6700/auth', {
//   //       method: 'GET',
//   //       credentials: 'include',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       }
//   //     });
      
//   // // const re=await response.json();
//   // // console.log(re);
  
//   // //     if (!response.ok) {
//   // //       throw new Error("Failed to assign role. Please try again.");
//   // //     }
//   //   } catch (error) {
//   //     console.error("Error assigning role:", error);
//   //     throw error;
//   //   }
//   // }
//   async function handleLogoutCall() {
//     try{
//       const response = await fetch('http://localhost:8081/logout', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if(response.ok){
//         navigate("/login")
//       }
//     }
//       catch(error){
//           console.error("error");
          
//       }
// }
//   const handleAddEmployeeClick = () => {
//     navigate("/addemployee");
//   };
//   const handleLogout=()=>{
  
//     const confirmLogout=window.confirm("Are you sure want to Logout?");
//     if(confirmLogout)
//     {
//      handleLogoutCall();
//     }
//   }
 
//   const handleAddManagerClick = () => {
//     navigate("/addManager");
//   };
//   const handleAddProjectClick = () => {
//     navigate("/addProject");
//   };
//   const handleGetAllProjectClick = () => {
//     navigate("/getAllProject");
//   };
//   const handleGetAlleEmployeeClick = () => {
//     navigate("/GetAllEmployee");
//   };
// const handleGetAllManagerClick=()=>{
// navigate("/getAllManager")
// };
//   return (
//     <div
//       className="vh-100 d-flex"
//       style={{
//         backgroundColor: "rgb(2,69,127,0.9)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh"
//       }}
//     >
//       {/* Sidebar */}
//       <div className="d-flex flex-column p-4 bg-dark text-white shadow-lg align-items-center justify-content-center" style={{ width: "250px", minHeight: "100vh" }}>
//         <h4 className="mb-4"></h4>
//         {/* Left-Side Logo */}
//         <NavbarBrand href="#" className="d-flex align-items-center" style={{ position: "absolute", top: "10px", left: "25px" }}>
//           <img
//             src="https://modussystems.com/images/modus-logo-white.png"
//             alt="Logo"
//             style={{ width: "100px", height: "30px", filter: "brightness(10)", color: "white" }}
//           />
//         </NavbarBrand>
//         {/* Employee Button */}
//         <Button
//           color="primary"
//           className="mb-3 d-flex justify-content-between align-items-center"
//           onClick={() => setShowEmployeeOptions(!showEmployeeOptions)}
//           style={{ fontSize: "1.25rem", width: "100%" }}
//         >
//           Employee {showEmployeeOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//         </Button>

//         {/* Sub-options for Employee */}
//         {showEmployeeOptions && (
//           <div className="ps-3">
//             <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddEmployeeClick}>
//               ➕Add Employee
//             </Button>
//             <Button color="info" className="w-100 text-start" onClick={handleGetAlleEmployeeClick}>
//               getAllempoyee
//             </Button>
//             {/* <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Employee")}>
//               ❌ Delete Employee
//             </Button> */}
//           </div>
//         )}
//         {/* Project Button */}
//         <Button
//           color="primary"
//           className="mb-3 d-flex justify-content-between align-items-center"
//           onClick={() => setShowProjectDetails(!showProjectDetails)}
//           style={{ fontSize: "1.25rem", width: "100%" }}
//         >
//           Project {showProjectDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//         </Button>
//         {showProjectDetails && (
//           <div className="ps-3">
//             <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddProjectClick}>
//               ➕ Add Project
//             </Button>
//             <Button color="info" className="w-100 text-start" onClick={handleGetAllProjectClick}>
//               getAllProject
//             </Button>
       
//           </div>
//         )}
//         {/* Manager Button */}
//         <Button
//           color="primary"
//           className="mb-3 d-flex justify-content-between align-items-center"
//           onClick={() => setShowManagerOptions(!showManagerOptions)}
//           style={{ fontSize: "1.25rem", width: "100%" }}
//         >
//           Manager {showManagerOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//         </Button>

//         {/* Sub-options for Manager */}
//         {showManagerOptions && (
//           <div className="ps-3">
//             <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddManagerClick}>
//               ➕ Add Manager
//             </Button>
//             {/* <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Manager")}>
//               ❌ Delete Manager
//             </Button> */}
//             <Button color="info" className="w-100 text-start" onClick={handleGetAllManagerClick}>
//               getAllManager
//             </Button>        
//               </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
//         {/* Navbar */}
//         <Navbar expand="md" className="bg- bg-opacity-500 fixed-top shadow-sm">
//           <Container className="d-flex justify-content-between">
//             {/* Menu Toggler */}
//             <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} className="ms-auto">
//               {menuOpen ? <X size={30} className="text-white" /> : <Menu size={30} className="text-white" />}
//             </NavbarToggler>

//             <Collapse isOpen={menuOpen} navbar>
//               <Nav className="ms-auto">
//                 <NavItem><NavLink href="#" className="text-white">Home</NavLink></NavItem>
//                 <NavItem><NavLink href="#"  className="text-white">About</NavLink></NavItem>
//                 <NavItem><NavLink href="#" className="text-white">Services</NavLink></NavItem>
//                 <NavItem><NavLink href="#" className="text-white">Contact</NavLink></NavItem>
//                 <LogOut
//                 size={23}
//                color="white"
//                style={{ position: "absolute", top: "17px", right:"50px", cursor: "pointer" }}
//                onClick={handleLogout}
//                />
//               </Nav>
//             </Collapse>
//           </Container>
//         </Navbar>

//         {/* Centered Text */}
//         <Container className="d-flex flex-column align-items-center text-center" style={{ height: "100vh", margin: "80px" }}>
//           <Row className="justify-content-center">
//             <Col xs={12} md={8}>
//               <img
//                 src="https://modussupport.com:8443/resources/e1msu/login/Login/img/modus-logo-white.png"
//                 alt="New Logo"
//                 style={{ width: "200px", height: "60px", marginBottom: "20px" }}
//               />
//               <h1
//             className="text-center"
//             style={{
//               color: "rgb(199, 209, 224)",
//               fontSize: "4rem",
//               fontWeight: "bold",
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//               marginTop: "240px",
//               animation: "fadeIn 2s ease-in-out",
//               transform: "perspective(500px) rotateX(10deg)"
//             }}
//           >
//             Employee Project Management System
//           </h1>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Home;
 
import React, { useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Menu, X, ChevronDown, ChevronUp, LogOut, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Welcome");
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
  const [showManagerOptions, setShowManagerOptions] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // async function Call() {
  //   console.log("call");
  //   try {
  //     const response = await fetch('http://localhost:6700/auth', {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  // // const re=await response.json();
  // // console.log(re);
  // //     if (!response.ok) {
  // //       throw new Error("Failed to assign role. Please try again.");
  // //     }
  //   } catch (error) {
  //     console.error("Error assigning role:", error);
  //     throw error;
  //   }
  // }
  async function handleLogoutCall() {
    try {
      const response = await fetch('http://localhost:8081/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        navigate("/login")
      }
    }
    catch (error) {
      console.error("error");
    }
  }
  const handleAddEmployeeClick = () => {
    navigate("/addemployee");
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure want to Logout?");
    if (confirmLogout) {
      handleLogoutCall();
    }
  }
  const handleAddManagerClick = () => {
    navigate("/addManager");
  };
  const handleAddProjectClick = () => {
    navigate("/addProject");
  };
  const handleGetAllProjectClick = () => {
    navigate("/getAllProject");
  };
  const handleGetAlleEmployeeClick = () => {
    navigate("/GetAllEmployee");
  };
  const handleGetAllManagerClick = () => {
    navigate("/getAllManager")
  };
  const toggleUploadModal = () => {
    setUploadModal(!uploadModal)
    setFile(null); setError("")
  }
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
 
  const handleFile = (file) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (validTypes.includes(file.type) ||
      file.name.endsWith('.csv') ||
      file.name.endsWith('.xlsx')) {
      setFile(file);
      setError("");
    } else {
      setError("Please upload a valid CSV or XLSX file");
      setFile(null);
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    // Reset the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:8081/file/upload", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
      .then(response => {
        console.log("Response status:", response.status);
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else if (contentType && contentType.includes("text/plain")) {
          return response.text();
        } else {
          throw new Error("Unsupported content type: " + contentType);
        }
      })
      .then(data => {
        console.log("Response data:", data);
        if (typeof data === "string") {
          toast.success(data, { position: "top-center" });
          toggleUploadModal();
        } else {
          toast.error(data.message || "An error occurred", { position: "top-center" });
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setError("Error uploading file: " + error.message);
      });
    // fetch("http://localhost:8080/api/upload", {
    //   method: "POST",
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if(data.status != 200)
    //     toast.error(data.message, {position:"top-center"});
    //   else{
    //     toast.success("File uploaded successfully!", {position:"top-center"});
    //     toggleUploadModal();
    //   }
    // })
    // .catch(error => {
    //   setError("Error uploading file: " + error.message);
    // });
    // // For now, we'll just show a success message
    // // alert(`File ${file.name} would be uploaded to the backend`);
    // // toggleUploadModal();
    // // setFile(null);
  };
  return (
 
    <div
      className="vh-100 d-flex"
      style={{
        backgroundColor: "rgb(2,69,127,0.9)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      {/* Sidebar */}
      <div className="d-flex flex-column p-4 bg-dark text-white shadow-lg align-items-center justify-content-center" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="mb-4"></h4>
        {/* Left-Side Logo */}
        <NavbarBrand href="#" className="d-flex align-items-center" style={{ position: "absolute", top: "10px", left: "25px" }}>
          <img
            src="https://modussystems.com/images/modus-logo-white.png"
            alt="Logo"
            style={{ width: "100px", height: "30px", filter: "brightness(10)", color: "white" }}
          />
        </NavbarBrand>
        {/* Employee Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowEmployeeOptions(!showEmployeeOptions)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Employee {showEmployeeOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
 
        {/* Sub-options for Employee */}
        {showEmployeeOptions && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddEmployeeClick}>
              ➕Add Employee
            </Button>
            <Button color="info" className="w-100 text-start" onClick={handleGetAlleEmployeeClick}>
              getAllempoyee
            </Button>
            {/* <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Employee")}>
              ❌ Delete Employee
            </Button> */}
          </div>
        )}
        {/* Project Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowProjectDetails(!showProjectDetails)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Project {showProjectDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
        {showProjectDetails && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddProjectClick}>
              ➕ Add Project
            </Button>
            <Button color="info" className="w-100 text-start" onClick={handleGetAllProjectClick}>
              getAllProject
            </Button>
          </div>
        )}
        {/* Manager Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowManagerOptions(!showManagerOptions)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Manager {showManagerOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
 
        {/* Sub-options for Manager */}
        {showManagerOptions && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddManagerClick}>
              ➕ Add Manager
            </Button>
            {/* <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Manager")}>
              ❌ Delete Manager
            </Button> */}
            <Button color="info" className="w-100 text-start" onClick={handleGetAllManagerClick}>
              getAllManager
            </Button>
          </div>
        )}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={toggleUploadModal}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          File Upload <Upload size={18} className="me-2" />
        </Button>
      </div>
 
 
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {/* Navbar */}
        <Navbar expand="md" className="bg- bg-opacity-500 fixed-top shadow-sm">
          <Container className="d-flex justify-content-between">
            {/* Menu Toggler */}
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} className="ms-auto">
              {menuOpen ? <X size={30} className="text-white" /> : <Menu size={30} className="text-white" />}
            </NavbarToggler>
 
            <Collapse isOpen={menuOpen} navbar>
              <Nav className="ms-auto">
            
                <LogOut
                  size={23}
                  color="white"
                  style={{ position: "absolute", top: "17px", right: "50px", cursor: "pointer" }}
                  onClick={handleLogout}
                />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
 
        {/* Centered Text */}
        <Container className="d-flex flex-column align-items-center text-center" style={{ height: "100vh", margin: "80px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <img
                src="https://modussupport.com:8443/resources/e1msu/login/Login/img/modus-logo-white.png"
                alt="New Logo"
                style={{ width: "200px", height: "60px", marginBottom: "20px" }}
              />
              <h1
                className="text-center"
                style={{
                  color: "rgb(199, 209, 224)",
                  fontSize: "4rem",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  marginTop: "240px",
                  animation: "fadeIn 2s ease-in-out",
                  transform: "perspective(500px) rotateX(10deg)"
                }}
              >
                Employee Project Management System
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      {/* File Upload Modal */}
      <Modal isOpen={uploadModal} toggle={toggleUploadModal}>
        <ModalHeader toggle={toggleUploadModal}>Upload File</ModalHeader>
        <ModalBody>
          <div
            className={`border-2 border-dashed rounded p-5 text-center ${dragActive ? "border-primary bg-light" : "border-secondary"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mb-3" />
            <p>Drag and drop your CSV or XLSX file here</p>
            <p className="text-muted">or</p>
            <input
              type="file"
              id="file-upload"
              accept=".csv,.xlsx"
              onChange={handleChange}
              className="d-none"
              ref={fileInputRef}
            />
            <label htmlFor="file-upload" className="btn btn-primary">
              Browse Files
            </label>
            {file && (
              <div className="mt-3">
                <p>Selected file: <strong>{file.name}</strong></p>
                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemoveFile} disabled={!file}>
            Remove
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={!file}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
};
 
export default Home;
 