import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const { budget } = useContext(AppContext);

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
      <span data-testid="remaining-value">Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
