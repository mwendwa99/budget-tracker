import PropTypes from "prop-types";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const TransactionForm = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.amount) {
      addTransaction(formData);
      setFormData({ ...formData, amount: "" }); // Reset amount to zero
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Transaction Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
        <Select
          labelId="transaction-type-label"
          id="transaction-type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          variant="standard"
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Button type="submit" variant="contained" color="primary">
          Add Transaction
        </Button>
        <Typography variant="h6">
          Budget: {formData.type === "income" ? "+" : "-"} {formData.amount}
        </Typography>
      </Box>
    </form>
  );
};

export default TransactionForm;

TransactionForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
};
