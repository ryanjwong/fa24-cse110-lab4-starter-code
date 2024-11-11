import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const [id, setId] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<number>(0);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense = { id: id.toString(), description, cost };

    try {
      await createExpense(newExpense); // Ensure any async behavior is awaited
      setExpenses([...expenses, newExpense]);
      setId(id + 1);
    } catch (error) {
      console.error("Failed to create expense:", error); // Logs error for debugging
    }
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(parseInt(e.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
