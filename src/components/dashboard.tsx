import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  TableSortLabel,
} from "@mui/material";
import {  styled } from "@mui/system";
import axios from "axios";

// Styled TableRow for alternating row colors
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme?.palette?.action?.hover || "#f5f5f5",
  },
}));

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<keyof any>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard/get");
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (property: keyof any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    const sortedUsers = [...users].sort((a, b) => {
      if (isAsc) {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
    setUsers(sortedUsers);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh", width: "100vw", display: "flex" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh", width: "100vw", display: "flex" }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 20, width: "80vw", alignContent:"center" }}>
      <Typography variant="h4" align="center" fontWeight="bold" color="brown" gutterBottom>
        Users Dashboard
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, alignContent:"center",alignItems:"center" }}>
        <Table>
          <TableHead  >
            <TableRow>
              {/* <TableCell sortDirection={orderBy === "id" ? order : false}>
                {/* <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSort("id")}
                >
                  ID
                </TableSortLabel> */}
              {/* </TableCell> */} 
              <TableCell sortDirection={orderBy === "name" ? order : false} sx={{ color: "black", backgroundColor:"lightblue", fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              {/* <TableCell sx={{ color: "black",backgroundColor:"lightblue", fontWeight: "bold" }}>Username</TableCell> */}
              <TableCell sx={{ color: "black",backgroundColor:"lightblue", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "black", backgroundColor:"lightblue",fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ color: "black", backgroundColor:"lightblue",fontWeight: "bold" }}>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                {/* <TableCell>{user.id}</TableCell> */}
                <TableCell>{user.name}</TableCell>
                {/* <TableCell>{user.username}</TableCell> */}
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.designation}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
