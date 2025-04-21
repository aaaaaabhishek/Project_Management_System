import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";
 
function GetAllProject() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 20;
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState([]);
 
  // Handle checkbox selection
  const handleCheckboxChange = (projectID) => {
    setSelectedProjects(prevSelected =>
      prevSelected.includes(projectID)
        ? prevSelected.filter(id => id !== projectID)
        : [...prevSelected, projectID]
    );
  };
 
  const fetchProjects = async (currentPage) => {
    try {
      const response = await fetch(`http://localhost:8081/api/getAllProject?page=${currentPage}&limit=${limit}`,{
        credentials:"include"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
 
      const data = await response.json();
      const newProjects = data.content || data;
console.log(newProjects);
 
      setProjects(newProjects);
      setHasMore(newProjects.length === limit); // If we got less than 20, no next page
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
 
  async function handleDelete() {
    try {
      const response = await fetch('http://localhost:8081/api/deleteProject', {
        method: "DELETE",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProjects),
      });
 
      if (response.status === 204) {
        setSelectedProjects([]); // Clear selected projects
        fetchProjects(page); // Re-fetch projects to update the list
        }
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    fetchProjects(page);
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
    <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
      <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingLeft: "40px" ,paddingRight:"40px"}}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Select</th>
              <th>Index</th>
              <th>ProjectID</th>
              <th>ProjectName</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Cost</th>
              <th>ProjectType</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, index) => (
              <tr key={proj.projectID}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(proj.projectID)}
                    onChange={() => handleCheckboxChange(proj.projectID)}
                  />
                </td>
                <td>{page * limit + index + 1}</td>
                <td
  onClick={() => navigate('/getProjectById/' + proj.projectID)}  style={{ cursor: "pointer" }}>
  {proj.projectID}
</td>
                <td>{proj.projectName}</td>
                <td>{proj.startDate}</td>
                <td>{proj.endDate}</td>
                <td>{proj.cost}</td>
                <td>{proj.projectType}</td>
                <td>{proj.managerId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
 
      <div className="d-flex justify-content-between mt-3">
        <Button color="secondary" onClick={handlePrev} disabled={page === 0}>
          Previous
        </Button>
 
        <Button
          color="danger"
          onClick={handleDelete}
          disabled={selectedProjects.length === 0}
        >
          Delete
        </Button>
 
        <Button color="primary" onClick={handleNext} disabled={!hasMore}>
          Next
        </Button>
      </div>
    </div>
  );
}
 
export default GetAllProject;