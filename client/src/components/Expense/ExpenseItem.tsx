import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { deleteExpense, fetchExpenses } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async (currentExpense: Expense) => {
    deleteExpense(currentExpense.id);
    setExpenses(expenses.filter(expense=> expense.id != currentExpense.id))
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button data-testid="Delete" onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
