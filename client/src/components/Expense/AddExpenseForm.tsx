import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getValue } from "@testing-library/user-event/dist/utils";
import { createExpense } from "../../utils/expense-utils";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const [id, setId] = useState<string>('1');
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<number>(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense = {id, description, cost}
    createExpense(newExpense)
    setExpenses([...expenses, newExpense])
    setId(id+1)
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
            onChange={(e) => { setDescription(e.target.value) }}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => { setCost(parseInt(e.target.value)) }}
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
