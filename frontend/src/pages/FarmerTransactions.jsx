import React from "react";
import { 
  Box, Card, CardContent, CardHeader, Typography, Button, Stack, 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useData } from "../context/DataContext";


const FarmerTransactions = () => {
    const orders = [
        { id: 1, exporter: "Exporter A", quantity: "200kg", due: "Fri, 10AM" },
        { id: 2, exporter: "Exporter B", quantity: "100kg", due: "Sat, 2PM" },
        { id: 3, exporter: "Exporter C", quantity: "150kg", due: "Sun, 12PM" },
      ];

      
    const { transactions, loadingTransactions, fetchTransactions } = useData();
    // Fetch transactions on component mount
    React.useEffect(() => {
        fetchTransactions();
    }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#d4edda"; // Light green
      case "Pending":
        return "#fff3cd"; // Light yellow
      case "Rejected":
        return "#f8d7da"; // Light red
      default:
        return "#ffffff"; // Default white
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
      {/* Order History Section (66% Width) */}
      <Box sx={{ width: "66%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 3, height: "420px", display: "flex", flexDirection: "column" }}>
          <CardHeader title="📜 Order History" sx={{ textAlign: "center", bgcolor: "#f5f5f5", py: 2 }} />
          <CardContent sx={{ overflowY: "auto", flexGrow: 1 }}>
            {loadingTransactions ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
              </Box>
            ) : transactions.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Exporter</strong></TableCell>
                      <TableCell><strong>Crop</strong></TableCell>
                      <TableCell><strong>Quantity (kg)</strong></TableCell>
                      <TableCell><strong>Price per kg ($)</strong></TableCell>
                      <TableCell><strong>Total Sale ($)</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Quality</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((order) => (
                      <TableRow key={order.id} sx={{ bgcolor: getStatusColor(order.status) }}>
                        <TableCell>{order.exporter_id}</TableCell>
                        <TableCell>{order.crop_name}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>${order.price_per_kg.toFixed(2)}</TableCell>
                        <TableCell>${(order.quantity * order.price_per_kg).toFixed(2)}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.quality}</TableCell>
                        <TableCell>
                          {order.status === "Completed" && "✔ Completed"}
                          {order.status === "Pending" && "⏳ Pending"}
                          {order.status === "Rejected" && "❌ Rejected"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                No transactions found.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Incoming Orders Section (33% Width) */}
      <Box sx={{ width: "33%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 3, height: "420px", display: "flex", flexDirection: "column"  }}>
          <CardHeader
            title="📦 Incoming Orders"
            sx={{ textAlign: "center", bgcolor: "#f5f5f5", py: 2 }}
          />
          <CardContent sx={{ overflowY: "auto", flexGrow: 1 }}>
            {orders.map((order) => (
              <Box
                key={order.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>
                  🚚 {order.exporter}: Needs {order.quantity} (Due: {order.due})
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success" startIcon={<Check />}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error" startIcon={<Close />}>
                    Decline
                  </Button>
                </Stack>
              </Box>
            ))}
            <Button fullWidth variant="outlined">📜 View All Orders</Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FarmerTransactions;
