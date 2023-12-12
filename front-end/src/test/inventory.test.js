import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InventoryBody from '../component/management/Inventory/InventoryBody';

// Mock the props
const mockProps = {
    value: {
        handleAdding: jest.fn(),
        handleRemove: jest.fn(),
        ingredient: '',
        setIngredient: jest.fn(),
    },
    userInventory: [{ ingredient: 'Chicken' }],
};

describe('On InventoryBody component render', () => {
    it('renders without crashing', () => {
        render(<InventoryBody {...mockProps} />);
    });

    it('handles category click', () => {
        const { getByText } = render(<InventoryBody {...mockProps} />);
        const category = screen.getByRole('button', { name: 'Proteins' });
        fireEvent.click(category);
        const selectedCategoryTitle = screen.getByRole('heading', { level: 2, name: 'Proteins' });
        expect(selectedCategoryTitle).toBeInTheDocument();
    });

    it('handles adding to inventory', () => {
        const { getByText } = render(<InventoryBody {...mockProps} />);
        const addButtons = screen.getAllByText('Add to Inventory');
        const addButton = addButtons[0];
        fireEvent.click(addButton);
        expect(mockProps.value.handleAdding).toBeCalled();
    });

    it('handles removing from inventory', () => {
        const { getByText } = render(<InventoryBody {...mockProps} />);
        const removeButtons = screen.getAllByText('Remove from Inventory')
        const removeButton = removeButtons[0];
        fireEvent.click(removeButton);
        expect(mockProps.value.handleRemove).toBeCalled();
    });
});
