import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const Signup: React.FC = () => {
    const naivgate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    designation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let sendData = {
      name: formData.name,
      // username: formData.username,
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.mobileNumber,
      designation: formData.designation,
    };

    try {
      const response = await axios.post(
        "http://18.181.221.66:3000/api/auth/register",
        sendData
      );
      
      if (response.status === 200) {
        setSuccess("Signup successful! You can now log in.");
        setFormData({
          name: "",
          // username: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobileNumber: "",
          designation: "",
        });
        naivgate("/login");
      }
    } catch (err: any) {
      console.log(err,"err");
      // console.log(response,"error res");
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Grid
      container
  justifyContent="center"
  alignItems="center"
  style={{width:"180vh"}}
  sx={{
    width: "100%",         
    height: "100vh",       
    padding: 2,
    boxSizing: "border-box",
  }}
    >
        
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          backgroundColor: "white",
          
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold" align="center" gutterBottom>
          Signup
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {/* <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        /> */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          error={formData.password.length > 0 && formData.password.length < 8} 
          helperText={
            formData.password.length > 0 && formData.password.length < 8
              ? "Password must be at least 8 characters"
            : ""
            }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      <TextField
  fullWidth
  margin="dense"
  label="Mobile Number"
  name="mobileNumber"
  type="tel"
  value={formData.mobileNumber}
  onChange={handleChange}
  required
  error={!!(formData.mobileNumber && formData.mobileNumber.length !== 10)}
  helperText={
    formData.mobileNumber && formData.mobileNumber.length !== 10
      ? "Mobile number must be exactly 10 digits"
      : ""
  }
/>

        <TextField
          fullWidth
          margin="normal"
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Signup
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Signup;
