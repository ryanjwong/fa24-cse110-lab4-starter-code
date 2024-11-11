import { API_BASE_URL } from "../constants";
import { Expense } from "../types/types";

// Function to create an expense in the backend. Method: POST
export const createExpense = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create expense: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createExpense:", error);
    throw error;
  }
};

// Function to delete an expense in the backend. Method: DELETE
// Function to delete an expense in the backend. Method: DELETE
export const deleteExpense = async (id: string): Promise<void> => {
	try {
	  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ id }), // Including 'id' in the request body
	  });
  
	  if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to delete expense with ID ${id}: ${errorText}`);
	  }
	} catch (error) {
	  console.error("Error in deleteExpense:", error);
	  throw error;
	}
  };
  

// Function to get all expenses from the backend. Method: GET
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch expenses: ${errorText}`);
    }

    const jsonResponse = await response.json();
    console.log("Data received in fetchExpenses:", jsonResponse);

    // Ensure data is defined and an array
    if (!jsonResponse || !Array.isArray(jsonResponse.data)) {
      throw new Error("Unexpected response format in fetchExpenses");
    }

    return jsonResponse.data;
  } catch (error) {
    console.error("Error in fetchExpenses:", error);
    throw error;
  }
};
