import React, { useState } from "react";
import { Container, Heading, VStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      { withCredentials: true }
    );

    console.log("Login response:", data);

    if (data.success) {
      navigate("/plan"); // Navigate on success
    } else {
      setError("Login failed");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <Container
      maxW="md"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        spacing={6}
        w="full"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading size="lg" textAlign="center" color="yellow.500">
          Welcome to Job Portal
        </Heading>

        {error && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={4} align="stretch">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            
            <Text fontSize="sm" textAlign="right">
              <Link to="/reset" style={{ color: "blue" }}>
                Forgot Password?
              </Link>
            </Text>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "yellow",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
