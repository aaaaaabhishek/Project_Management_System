import { Underline } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";

function GetAllManagers() {
  const [managers, setManagers] = useState([]);
  const [page, setPage] = useState(0); // 0-based index for backend
  const limit = 20;
  const navigate = useNavigate(); // Correctly call useNavigate
  const [hasMore, setHasMore] = useState(true);
  const [selectedManagers, setSelectedManager] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (managerId) => {
    setSelectedManager(prevSelected =>
      prevSelected.includes(managerId)
        ? prevSelected.filter(id => id !== managerId)
        : [...prevSelected, managerId]
    );
  };

  const fetchManagers = async (currentPage) => {
    try {
      const response = await fetch(`http://localhost:8081/api/getAllManager?page=${currentPage}&limit=${limit}`,{
        credentials:"include"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      const newManagers = data.content || data;
console.log(newManagers);

      setManagers(newManagers);
      setHasMore(newManagers.length === limit); // If we got less than 20, no next page
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  async function handleDelete() {
    try {
      const response = await fetch('http://localhost:8081/api/deleteManger', {
        method: "DELETE",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedManagers),
      });

      if (response.status === 204) {
        setSelectedManager([]); // Clear selected projects
        fetchManagers(page); // Re-fetch projects to update the list
        }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchManagers(page);
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
              <th>managerId</th>
              <th>managerName</th>
              <th>Projects</th>
     
            </tr>
          </thead>
          <tbody>
            {managers.map((manager, index) => (
              <tr key={manager.managerId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedManagers.includes(manager.managerId)}
                    onChange={() => handleCheckboxChange(manager.managerId)}
                  />
                </td>
                <td>{page * limit + index + 1}</td>
                <td 
  onClick={() => navigate('/getManagerById/' + manager.managerId)}  style={{ cursor: "pointer" }}>
  {manager.managerId}
</td>
                <td>{manager.managerName}</td>
<td>
  {manager.projects.length > 0 && (
    <div style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px",fontWeight:"bold"}}>
      <label>ProjectID</label>
      <label>Project</label>
    </div>
  )}
  {manager.projects.map((project, i) => (
    <div key={i} style={{ display: 'flex', justifyContent: 'space-between' ,paddingRight:"40px"}}>
      <span>{project.projectID}</span>
      <span>{project.projectName}</span>
    </div>
  ))}
</td>


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
          disabled={selectedManagers.length === 0}
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

export default GetAllManagers;

