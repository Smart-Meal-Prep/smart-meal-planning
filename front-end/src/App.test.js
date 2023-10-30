import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import SmartMealsLogo from './components/SmartMealsLogo';
import NavBar from './components/NavBar';
import PasswordInput from './components/PasswordInput';
import EmailInput from './components/EmailInput';

test('SmartMealsLogo should render "Smart Meals"', () => {
  const { getByText } = render(<SmartMealsLogo />);
  const smartMealsText = screen.getByText('Smart Meals');
  expect(smartMealsText).toBeInTheDocument();
});

test('NavBar should render Home, Inventory, Recipes, and Meal Planning buttons', () => {
  const { getByText } = render(<NavBar />);
  const homeButton = screen.getByText('Home');
  const inventoryButton = screen.getByText('Inventory');
  const recipesButton = screen.getByText('Recipes');
  const mealPlanningButton = screen.getByText('Meal Planning');

  expect(homeButton).toBeInTheDocument();
  expect(inventoryButton).toBeInTheDocument();
  expect(recipesButton).toBeInTheDocument();
  expect(mealPlanningButton).toBeInTheDocument();
});

test('PasswordInput should render an input element with "Password"', () => {
  const { getByLabelText } = render(<PasswordInput />);
  const passwordInput = screen.getByText('Password:');
  expect(passwordInput).toBeInTheDocument();
});

test('EmailInput should render an input element with "Email"', () => {
  const { getByLabelText } = render(<EmailInput />);
  const emailInput = screen.getByText('Email:');
  expect(emailInput).toBeInTheDocument();
});
