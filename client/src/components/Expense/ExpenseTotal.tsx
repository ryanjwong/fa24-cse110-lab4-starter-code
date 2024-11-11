import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseTotal = () => {
  const { expenses } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

  return (
    <div className="alert alert-primary">
      <span data-testid="spent-value">Spent so far: ${totalExpenses}</span>
    </div>
  );
};

export default ExpenseTotal;
