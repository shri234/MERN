import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (): boolean => {
        const { identifier, password } = formData;
        
        if (!identifier || !password) {
            setError("Please fill in all required fields.");
            return false;
        }

        if (identifier.includes("@")) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(identifier)) {
                setError("Please enter a valid email address.");
                return false;
            }
        } else {
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(identifier)) {
                setError("Please enter a valid 10-digit mobile number.");
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post(
                `${ "http://18.181.221.66:3000"}/api/auth/login`, 
                {
                    identifier: formData.identifier.trim(),  // Changed from identifier to formData.identifier
                password: formData.password.trim(),   
                }
            );
            
            if (response.status === 200) {
                setSuccess("Login successful!");
                setFormData({
                    identifier: "",
                    password: "",
                });
                navigate("/dashboard");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               "An error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh",width:"200vh" }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 400,
                    width: "100%",
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <TextField
                    fullWidth
                    margin="normal"
                    label="Mobile Number or Email"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                    autoFocus
                    disabled={loading}
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
                    disabled={loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
            </Box>
        </Grid>
    );
};

export default Login;
