import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider } from './context/AppContext';

import { MyBudgetTracker } from './views/MyBudgetTracker';



describe('Budget Tracker Functionality', () => {
  beforeEach(() => {
    render(
      <AppProvider>
      <MyBudgetTracker />
    </AppProvider>
    );
  });

  test('1. Create an Expense', () => {
    // Add a new expense
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText('Cost'), { target: { value: '50' } });
    fireEvent.click(screen.getByText('Save'));

    // Verify the expense is added to the list
    expect(screen.getByText('Test Expense')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();

    // Verify the totals are updated
    expect(screen.getByText('Spent so far: $50')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $950')).toBeInTheDocument();
  });

  test('2. Delete an Expense', () => {
    // Add an expense first
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText('Cost'), { target: { value: '50' } });
    fireEvent.click(screen.getByText('Save'));

    // Delete the expense
    fireEvent.click(screen.getByTestId('Delete'));

    // Verify the expense is removed from the list
    expect(screen.queryByText('Test Expense')).not.toBeInTheDocument();

    // Verify the totals are updated
    expect(screen.getByText('Spent so far: $0')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $1000')).toBeInTheDocument();
  });

  test('3. Budget Balance Verification', () => {
    // Add multiple expenses
    const addExpense = (name: string, cost: string) => {
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: name } });
      fireEvent.change(screen.getByLabelText('Cost'), { target: { value: cost } });
      fireEvent.click(screen.getByText('Save'));
    };

    addExpense('Expense 1', '200');
    addExpense('Expense 2', '300');
    addExpense('Expense 3', '150');

    // Get the current values
    const budgetValue = parseInt(screen.getByTestId('budget-value').textContent!.replace('Budget: $', ''));
    const spentValue = parseInt(screen.getByTestId('spent-value').textContent!.replace('Spent so far: $', ''));
    const remainingValue = parseInt(screen.getByTestId('remaining-value').textContent!.replace('Remaining: $', ''));

    // Verify the equation: Budget = Remaining + Spent
    expect(budgetValue).toBe(remainingValue + spentValue);
  });

});