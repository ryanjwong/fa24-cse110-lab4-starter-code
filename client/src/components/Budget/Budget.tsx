import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<number>(0);
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
    try {
      setBudget(await fetchBudget());
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateBudget(newBudget);
    setBudget(newBudget);
    setNewBudget(0);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="row">
          <div className="col-sm">
            <label htmlFor="newBudget">New Budget</label>
            <input
              required
              type="text"
              className="form-control"
              id="budget"
              value={newBudget}
              onChange={(e) => { setNewBudget(parseInt(e.target.value)) }}
            ></input>
          </div>
          <div className="col-sm">
            <button type="submit" className="btn btn-primary mt-3">
              Save
            </button>
          </div>
        </div>
      </form>
      <div data-testid="budget-value">Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
