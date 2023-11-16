import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TransactionList = ({ transactions, deleteTransaction }) => {
  if (transactions.length === 0) {
    return <Typography variant="body2">No transactions yet.</Typography>;
  }

  return (
    <List>
      {transactions.map((transaction) => (
        <ListItem key={transaction.id}>
          <ListItemText
            primary={transaction.name}
            secondary={`${transaction.type === "income" ? "+" : "-"} ${
              transaction.amount
            }`}
          />
          <IconButton onClick={() => deleteTransaction(transaction.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TransactionList;

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTransaction: PropTypes.func.isRequired,
};
