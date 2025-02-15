import React, { useEffect } from "react";
import { Container, Box, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Stack, Button, CircularProgress } from "@mui/material";
import { Check, Close, History, Inbox } from "@mui/icons-material";
import { useData } from "../context/DataContext";

const FarmerTransactions = () => {
  const { transactions, loadingTransactions, fetchTransactions, orders, fetchOrders, updateOrderStatus } = useData();

  // Fetch orders when component mounts
  useEffect(() => {
    fetchTransactions();
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#d4edda"; // Light green
      case "Pending":
        return "#fbf4e0"; // Light yellow
      case "Rejected":
        return "#f8d7da"; // Light red
      default:
        return "#ffffff"; // Default white
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
      {/* Order History Section */}
      <Box sx={{ width: "66%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 3, height: "420px", display: "flex", flexDirection: "column", bgcolor: "#ffffff" }}>
          <CardHeader title="Order History" sx={{ textAlign: "center", bgcolor: "#f5f5f5", py: 2, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }} />
          <CardContent sx={{ overflowY: "auto", flexGrow: 1 }}>
            {loadingTransactions ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
              </Box>
            ) : transactions.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#eef2ff" }}>
                    <TableRow>
                      <TableCell><strong>Exporter</strong></TableCell>
                      <TableCell><strong>Crop</strong></TableCell>
                      <TableCell><strong>Quantity (kg)</strong></TableCell>
                      <TableCell><strong>Price per kg ($)</strong></TableCell>
                      <TableCell><strong>Total Sale ($)</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Organic</strong></TableCell>
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
                          {order.status === "Completed" && <Check sx={{ color: "green" }} />}
                          {order.status === "Pending" && <History sx={{ color: "orange" }} />}
                          {order.status === "Rejected" && <Close sx={{ color: "red" }} />}
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

      {/* Incoming Orders Section */}
      <Box sx={{ width: "33%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 3, height: "420px", display: "flex", flexDirection: "column", bgcolor: "#ffffff" }}>
          <CardHeader title="Incoming Orders" sx={{ textAlign: "center", bgcolor: "#f5f5f5", py: 2, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }} />
          <CardContent sx={{ overflowY: "auto", flexGrow: 1 }}>
            {orders.length > 0 ? (
              orders.filter(order => order.status === "Pending").map((order) => (
                <Box key={order.id} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2, bgcolor: "#fafafa" }}>
                  <Typography variant="body1" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                    <Inbox sx={{ color: "#6b5bff", mr: 1 }} /> {order.exporter_id}: Needs {order.crop_name} {order.quantity}kg at {order.price_per_kg}kShs/kg (Due: {order.due_date})
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#635BFF", color: "white", "&:hover": { backgroundColor: "#5348E2" } }}
                      startIcon={<Check />}
                      onClick={() => updateOrderStatus(order.id, "Accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="#f1f1f1"
                      startIcon={<Close />}
                      onClick={() => updateOrderStatus(order.id, "Declined")}
                    >
                      Decline
                    </Button>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                No incoming orders.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FarmerTransactions;