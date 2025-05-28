import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Alert,Link } from "@mui/material";
import axios from "axios";
// import { Link as RouterLink } from "react-router-dom";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name:"",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        designation: "",
    });

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
            name:formData.name,
            username: formData.username,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        designation: formData.designation
        }
        
        try {
            const response = await axios.post("http://52.69.123.182:3000/api/auth/register", sendData);
            if (response.status === 200) {
                setSuccess("Signup successful! You can now log in.");
                setFormData({
                    name:"",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobileNumber: "",
                    designation: "",
                });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <Grid 
    container 
    justifyContent="center" 
    alignItems="center" 
   style={{ minHeight: "100vh", width: "100vw", display: "flex" }}// Ensures full page height
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
        <Typography variant="h5" component="h1" gutterBottom>
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
        <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
        />
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
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />
        <TextField
            fullWidth
            margin="normal"
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
        />
        <TextField
            fullWidth
            margin="normal"
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
        />

        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
        >
            Signup
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href='/login' underline="hover">
                Login
            </Link>
        </Typography>
    </Box>
</Grid>

    );
};

export default Signup;
