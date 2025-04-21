
import React,{useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

// Function to register a new user
async function registerUser(formData) {
  console.log(formData);
  
  try {
    const response = await fetch("http://localhost:8081/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (response.status === 201) {
      const userId = await response.text();
      console.log(userId);
      
      return userId;
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// Function to fetch JWT token
async function fetchJwtToken(username, password) {
  console.log(username,password);
  
  try {
    const response = await fetch("http://localhost:8080/realms/spring/protocol/openid-connect/token",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: "spring-app",
        username: username,
        password: password,
        grant_type: "password"
      })
    });
console.log(response);
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      
      return responseData.access_token;
    } else {
      const text=await response.text();
      console.log(text);
      
      throw new Error("Failed to fetch JWT token. Please try again.",text);
    }
  } catch (error) {
    console.error("Error fetching JWT token:", error);
    throw error;
  }
}

// Function to assign role to user
async function assignRole(userId, accessToken, roleName) {
  console.log(userId,roleName);
  
  try {
    const response = await fetch(`http://localhost:8081/roles/assign/users/${userId}?roleName=${roleName}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to assign role. Please try again.");
    }
  } catch (error) {
    console.error("Error assigning role:", error);
    throw error;
  }
}

// Main function to handle registration process
async function handleRegistration(formData, navigate, setFormData) {
  try {
    const userId = await registerUser(formData);
    console.log("udddd",userId);
    
    const accessToken = await fetchJwtToken(formData.username, formData.password);
    await assignRole(userId, accessToken, "EMPLOYEE");
    alert("Registration successful!");
    navigate("/login");
  } catch (error) {
    alert(error.message);
  } finally {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: ""
    });
  }
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
    if (!emailPattern.test(formData.username)) {
      alert("Please enter a valid email address.");
      return;
    }
 
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 8 characters and include a number, a special character, and an alphabet.");
      return;
    }
 
      console.log("Form Data:", formData);
  
    await handleRegistration(formData, navigate, setFormData);
  };
  
  return (
    <div style={{
      backgroundColor: "#0a1931",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "",
      alignItems: "",
      padding: "20px"
    }}>
      <div style={{ marginLeft: "250px", marginTop: "300px", position: "absolute", left: "0" }}>
        <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ maxWidth: "550px" }}
        />
      </div>
      <Container fluid className="">
        <Row className="justify-content-end" style={{ marginTop: "200px", marginRight: "300px" }}>
          <Col xs={12} sm={8} md={6} lg={5} xl={4} className="d-flex justify-content-end">
            <Card className="shadow-lg p-5 rounded border-0" style={{
              background: "linear-gradient(135deg, #ffffff 10%, #e3f2fd 90%)",
              width: "100%",
              maxWidth: "450px",
              borderRadius: "20px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              padding: "30px"
            }}>
              <CardBody>
                <h2 className="text-center mb-4" style={{ color: "#003580", fontWeight: "bold", fontSize: "28px", textTransform: "uppercase", letterSpacing: "2px" }}>Registration</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>Username</Label>
                    <Input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>Password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>Confirm Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="firstName" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lastName" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" className="mt-3" style={{ width: "100%", fontSize: "16px", padding: "10px" }}>Register</Button>
                </Form>
                <div className="text-center mt-3">
                  <Link to="/login" style={{ color: "#0056b3", textDecoration: "none" }}>Already have an account? Login</Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;