// import { useState, useEffect } from "react";
// import { Table, Button, Container, Row, Col } from "reactstrap";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
 
 
 
// function GetAllEmployee() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [employees, setEmployees] = useState([]);
//     const [page, setPage] = useState(location.state?.page ||0); // 0-based index for backend
   
//     const limit = 10;
//     const [totalPages, setTotalPages]=useState(0);
//     const [hasMore, setHasMore] = useState(true);
//     const [selectedEmployees, setSelectedEmployees] = useState([]);
   
 
//     // Handle checkbox selection
//     const handleCheckboxChange = (empId) => {
//         setSelectedEmployees(prevSelected =>
//             prevSelected.includes(empId)
//                 ? prevSelected.filter(id => id !== empId)
//                 : [...prevSelected, empId]
//         );
//     };
 
//     const fetchEmployees = async (currentPage) => {
//         try {
//             const response = await fetch(`http://localhost:8081/getAllEmployee?page=${currentPage}&limit=${limit}`
//             ,
//             {method:"GET",
//                 headers: { "Content-Type": "application/json" },

//                 credentials:"include"
//             }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to fetch employees");
//             }
 
//             const data = await response.json();
//             const newEmployees = data.content || data;
//             setTotalPages(data.totalPages);
           
//             setEmployees(newEmployees);
//             setHasMore(newEmployees.length === limit); // If we got less than 10, no next page
//         } catch (error) {
//             setHasMore(false);
//             alert("Failed to connect with server");
//         }
//     };
 
//     async function handleDelete() {
//         const isConfirm = window.confirm("Are you sure you want to delete the selected employees?");
//         if (isConfirm) {
//             try {
//                 const response = await fetch('http://localhost:8081/deleteEmployees', {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(selectedEmployees),
//                 });
 
//                 if (response.status === 200) {
//                     alert("Employees deleted successfully!");
//                     setSelectedEmployees([]); // Clear selected employees
//                     fetchEmployees(page); // Re-fetch employees to update the list
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
 
//     };
 
//     useEffect(() => {
//         fetchEmployees(page);
//     }, [page]);
 
//     const handleNext = () => {
//         setPage((prevPage) => prevPage + 1);
//     };
 
//     const handlePrev = () => {
//         if (page > 0) {
//             setPage((prevPage) => prevPage - 1);
//         }
//     };
 
//     return (
//         <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
//             <h2 style={{ color: "white" }}>Employees List</h2>
//             {employees.length > 0 && (
//                 <Table striped bordered >
//                     <thead>
//                         <tr>
//                             <th  style={{ width: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Select</th>
//                             <th >Index</th>
//                             <th >Employee ID</th>
//                             <th >Employee Name</th>
//                             <th >Phone</th>
//                             <th >Email</th>
//                             <th >Designation</th>
//                             <th >Salary</th>
//                             <th >Location</th>
//                             <th >Joining Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.map((emp, index) => (
//                             <tr key={emp.empId}>
//                                 <td  style={{ width: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedEmployees.includes(emp.empId)}
//                                         onChange={() => handleCheckboxChange(emp.empId)}
//                                     />
//                                 </td>
//                                 <td >{page * limit + index + 1}</td>
//                                 <td ><Link style={{ textDecoration: "none" }} to={`/getEmployee/${emp.empId}`} state={{page}} key={emp.empId}>{emp.empId}</Link></td>
//                                 <td >{emp.empName}</td>
//                                 <td >{emp.phone}</td>
//                                 <td >{emp.email}</td>
//                                 <td >{emp.designation}</td>
//                                 <td >{emp.salary}</td>
//                                 <td >{emp.location}</td>
//                                 <td >{emp.joiningDate}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             )}
 
//             <div className="d-flex justify-content-between mt-3">
//                 <Container fluid style={{ position: 'fixed', bottom: '0', left: '0', padding: '10px' }}>
//                     <Row>
//                         <Col xs={-12} md={6}>
//                             <Button
//                                 color="secondary"
//                                 onClick={() => { navigate('/') }}
//                                 style={{ marginLeft: "2%", marginRight: "2%" }}
//                             >
//                                 Back
//                             </Button>
//                             <Button
//                                 color="danger"
//                                 onClick={handleDelete}
//                                 disabled={selectedEmployees.length === 0}
//                             >
//                                 Delete
//                             </Button>
//                         </Col>
//                         <Col xs={12} md={6} className="d-flex justify-content-end align-items-center">
//                             <Button onClick={handlePrev} disabled={page === 0}>
//                                 &lt;
//                             </Button>
//                             <span className="mx-2" style={{color:"white"}}> Page {page + 1} of {totalPages}</span>
//                             <Button onClick={handleNext} disabled={!hasMore}>
//                                 &gt;
//                             </Button>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     );
// }
 
// export default GetAllEmployee;

import { useState, useEffect, useRef } from "react";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
 
function GetAllEmployee() {
    const navigate = useNavigate();
    const location = useLocation();
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(location.state?.page || 0); // 0-based index for backend
 
    const limit = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
 
    // Handle checkbox selection
    const handleCheckboxChange = (empId) => {
        setSelectedEmployees(prevSelected =>
            prevSelected.includes(empId)
                ? prevSelected.filter(id => id !== empId)
                : [...prevSelected, empId]
        );
    };
 
    const fetchEmployees = async (currentPage) => {
        try {
            const response = await fetch(`http://localhost:8081/getAllEmployee?page=${currentPage}&limit=${limit}`,{
                credentials:"include"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }
 
            const data = await response.json();
            const newEmployees = data.content || data;
            setTotalPages(data.totalPages);
 
            setEmployees(newEmployees);
            console.log(newEmployees.length);
           
            // setHasMore(newEmployees.length === limit); // If we got less than 10, no next page
            setHasMore(currentPage < data.totalPages - 1); // Check if there are more pages
 
        } catch (error) {
            setHasMore(false);
            toast.error("Failed to connect with server", { position: "top-center" });
        }
    };
 
    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:8081/deleteEmployees', {
                method: "DELETE",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEmployees),
            });
 
            if (response.status === 200) {
                toast.success("Employees deleted successfully", { position: "top-center" });
                setSelectedEmployees([]); // Clear selected employees
                fetchEmployees(page); // Re-fetch employees to update the list
            }
        } catch (error) {
            toast.error("Failed to delete employee", { position: "top-center" });
        }
    };
 
    const confirmDelete = () => {
        confirmDialog({
            message: 'Are you sure you want to delete the selected employees?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: handleDelete,
            reject: () => {}
        });
    };
 
    useEffect(() => {
        fetchEmployees(page);
    }, [page]);
 
    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };
 
    const handlePrev = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };
 
    return (
        <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
            <h2 style={{ color: "white" }}>Employees List</h2>
            {employees.length > 0 && (
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th style={{ width: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Select</th>
                            <th >Index</th>
                            <th >Employee ID</th>
                            <th >Employee Name</th>
                            <th >Phone</th>
                            <th >Email</th>
                            <th >Designation</th>
                            <th >Salary</th>
                            <th >Location</th>
                            <th >Joining Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp.empId}>
                                <td style={{ width: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(emp.empId)}
                                        onChange={() => handleCheckboxChange(emp.empId)}
                                    />
                                </td>
                                <td >{page * limit + index + 1}</td>
                                <td ><Link style={{ textDecoration: "none" }} to={`/getEmployee/${emp.empId}`} state={{ page }} key={emp.empId}>{emp.empId}</Link></td>
                                <td >{emp.empName}</td>
                                <td >{emp.phone}</td>
                                <td >{emp.email}</td>
                                <td >{emp.designation}</td>
                                <td >{emp.salary}</td>
                                <td >{emp.location}</td>
                                <td >{emp.joiningDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
 
            <div className="d-flex justify-content-between mt-3">
                <Container fluid style={{ position: 'fixed', bottom: '0', left: '0', padding: '10px' }}>
                    <Row>
                        <Col xs={-12} md={6}>
                            <Button
                                color="secondary"
                                onClick={() => { navigate('/') }}
                                style={{ marginLeft: "2%", marginRight: "2%" }}
                            >
                                Back
                            </Button>
                            <Button
                                color="danger"
                                onClick={confirmDelete}
                                disabled={selectedEmployees.length === 0}
                            >
                                Delete
                            </Button>
                        </Col>
                        <Col xs={12} md={6} className="d-flex justify-content-end align-items-center">
                            <Button onClick={handlePrev} disabled={page === 0}>
                                &lt;
                            </Button>
                            <span className="mx-2" style={{ color: "white" }}> Page {page + 1} of {totalPages}</span>
                            <Button onClick={handleNext} disabled={!hasMore}>
                                &gt;
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer />
            <ConfirmDialog />
        </div>
    );
}
 
export default GetAllEmployee;