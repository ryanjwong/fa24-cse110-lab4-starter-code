import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}



// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // Validate input
    if (body.amount === undefined || isNaN(Number(body.amount))) {
        return res.status(400).send({ error: "Invalid budget amount provided" });
    }

    // Update budget
    budget.amount = Number(body.amount);

    // Return updated budget
    return res.status(200).send({ "data": budget.amount });
}
