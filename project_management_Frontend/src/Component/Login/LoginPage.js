import React, { useState } from "react"; // Import useState from React
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
import { useAuth } from './AuthContext';

import { Link, useNavigate } from "react-router-dom"; // Combine imports from react-router-dom
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        setIsAuthenticated(true);

        navigate("/");
      } else {
        // Handle login failure
        console.error("Login failed");
        toast.error("Login failed Enter valid creaditential",{
          position :"top-center",}
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div style={{
      backgroundColor: "#0a1931",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      padding: "20px"
    }}>
      {/* Logo on the Left Side */}
      <div style={{ marginLeft: "250px", marginTop: "300px", position: "absolute", left: "0" }}>         
             <img
          src="https://modussystems.com/images/modus-logo-white.png"
          alt="Logo"
          style={{ maxWidth: "550px" }}
        />
      </div>

      <Container fluid>
      <Row className="justify-content-end" style={{ marginTop: "200px" ,marginRight:"300px"}}>        
              <Col xs={12} sm={8} md={6} lg={5} xl={4} className="d-flex justify-content-end">
            <Card
              className="shadow-lg p-5 rounded border-0"
              style={{
                background: "linear-gradient(135deg, #ffffff 10%, #e3f2fd 90%)",
                width: "100%",
                maxWidth: "450px",
                borderRadius: "20px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                padding: "30px",
                height: "auto" // Corrected height property
              }}
            >
              <CardBody>
                <h2 className="text-center mb-4" style={{ color: "#003580", fontWeight: "bold", fontSize: "28px", textTransform: "uppercase", letterSpacing: "2px" }}>Welcome Back</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username" className="font-weight-bold" style={{ fontSize: "16px", color: "#333" }}>Username</Label>
                    <Input
                      type="text" // Corrected input type
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-2 rounded border-primary"
                      style={{ fontSize: "14px", backgroundColor: "#eef2f7", border: "2px solid #0056b3" }}
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    block
                    className="mt-3 py-2 font-weight-bold shadow-sm rounded"
                    style={{ fontSize: "18px", backgroundColor: "#0056b3", border: "none", letterSpacing: "1.5px", textTransform: "uppercase", transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out" }}
                  >
                    Login
                  </Button>
                </Form>
                <div className="mt-3 py-2 font-weight-bold">
                  <p style={{ color: "#0056b3" }}>
                    Don't have an account? <Link to="/register" style={{ color: "#0056b3", textDecoration: "none" }}><b>Register here</b></Link>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;
