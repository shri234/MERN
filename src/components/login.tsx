import React,{useState} from "react";
import { TextField, Button, Grid, Typography, Box, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Password } from "@mui/icons-material";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
           identifier:"",
           password:""
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
        // if (formData.password !== formData.confirmPassword) {
        //     setError("Passwords do not match.");
        //     return;
        // }

        let sendData = {
            identifier:formData.identifier,
            password: formData.password
        }
        
        try {
            const response = await axios.post("http://54.64.209.208:3000/api/auth/login", sendData);
            if (response.status === 200) {
                setSuccess("Signup successful! You can now log in.");
                setFormData({
                    identifier:"",
                    password:""
                });
                navigate("/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", width: "100vw", display: "flex"  }}>
            <Box
                component="form"
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 400,
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <TextField
                    fullWidth
                    margin="normal"
                    label="Mobile Number or Username"
                    name="identifier"
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Box>
        </Grid>
    );
};

export default Login;
