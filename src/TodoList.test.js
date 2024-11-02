// src/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

  test('renders input and add button', () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test('can add a new task', () => {
    render(<TodoList />);
    
    // Simulate user typing and clicking "Add Task" button
    fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), {
      target: { value: 'Learn React Testing' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));

    // Check if the new task is in the document
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
  });

  test('can delete a task', () => {
    render(<TodoList />);

    // Add a new task
    fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), {
      target: { value: 'Learn React Testing' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
    
    // Confirm the task was added
    const taskItem = screen.getByText('Learn React Testing');
    expect(taskItem).toBeInTheDocument();

    // Click "Delete" button for the task
    fireEvent.click(screen.getByText(/Delete/i));

    // Confirm the task was deleted
    expect(screen.queryByText('Learn React Testing')).not.toBeInTheDocument();
  });

  test('does not add an empty task', () => {
    render(<TodoList />);

    // Try to add an empty task
    fireEvent.click(screen.getByText(/Add Task/i));

    // Check that no task item is added
    expect(screen.queryByTestId('task-item')).not.toBeInTheDocument();
  });
