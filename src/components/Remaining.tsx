import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;
  const alertShown = useRef(false);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (budget - totalExpenses < 0 && !alertShown.current) {
      alert("You have exceeded your budget!");
      alertShown.current = true;
    } else if (budget - totalExpenses >= 0) {
      alertShown.current = false;
    }
  }, [totalExpenses, budget]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
