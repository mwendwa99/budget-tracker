import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { v4 as uuidv4 } from "uuid";
import { Container, Typography, CssBaseline, Box, Paper } from "@mui/material";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Load transactions from local storage on component mount
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
    updateBalance(storedTransactions);
  }, []);

  const updateBalance = (updatedTransactions) => {
    const updatedBalance = updatedTransactions.reduce(
      (acc, transaction) =>
        transaction.type === "income"
          ? acc + parseFloat(transaction.amount)
          : acc - parseFloat(transaction.amount),
      0
    );
    setBalance(updatedBalance);
  };

  const addTransaction = (transaction) => {
    const newTransaction = { id: uuidv4(), ...transaction };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    updateBalance(updatedTransactions);
    // Save transactions to local storage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    updateBalance(updatedTransactions);
    // Save transactions to local storage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5" align="center" gutterBottom>
          Budget Tracker
        </Typography>
        <Paper sx={{ p: 2 }}>
          <TransactionForm addTransaction={addTransaction} />
          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />
          <Typography variant="h6" align="center">
            Total Budget Balance: {balance}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
