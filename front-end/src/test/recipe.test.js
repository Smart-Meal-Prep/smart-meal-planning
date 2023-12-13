import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeInfo from '../component/management/Recipes/RecipeInfo';
import RecipesBody from '../component/management/Recipes/RecipesBody';
import MealItem from '../component/management/Recipes/MealItem';

describe('renders RecipesBody component', () => {
    it('should render without crashing', () => {
        const mockProps = {
            recipes: [
                { name: 'Recipe 1', thumbnail: 'recipe1.jpg' },
                { name: 'Recipe 2', thumbnail: 'recipe2.jpg' },
            ],
            setRecipes: jest.fn(),
            selectedRecipe: null,
            setSelectedRecipe: jest.fn(),
            favoriteMealsList: [],
            setFavoriteMealsList: jest.fn(),
            handleAddFavorite: jest.fn(),
            handleRemoveFavorite: jest.fn(),
        };

        const { getByText, getByAltText } = render(<RecipesBody {...mockProps} />);

        const recipe1NameElement = screen.getByText('Recipe 1');
        const recipe2NameElement = screen.getByText('Recipe 2');
        const recipe1ThumbnailElements = screen.getAllByAltText('Meal pic');

        expect(recipe1NameElement).toBeInTheDocument();
        expect(recipe2NameElement).toBeInTheDocument();
        expect(recipe1ThumbnailElements[0]).toBeInTheDocument();
    });
});

describe('MealItem Component', () => {
    it('renders MealItem component', () => {
        const mockRecipe = {
            name: 'Test Recipe',
            thumbnail: 'test.jpg',
        };

        const { getByText, getByAltText } = render(
            <MealItem
                recipe={mockRecipe}
                setSelectedRecipe={() => { }}
                handleAddFavorite={() => { }}
                handleRemoveFavorite={() => { }}
                favoriteMealsList={[]}
            />
        );

        const recipeNameElement = screen.getByText('Test Recipe');
        const thumbnailElement = screen.getByAltText('Meal pic');

        expect(recipeNameElement).toBeInTheDocument();
        expect(thumbnailElement).toBeInTheDocument();
    });

    it('clicking favorite button calls handleAddFavorite', () => {
        const mockRecipe = {
            name: 'Test Recipe',
            thumbnail: 'test.jpg',
        };

        const handleAddFavoriteMock = jest.fn();

        const { getByText } = render(
            <MealItem
                recipe={mockRecipe}
                setSelectedRecipe={() => { }}
                handleAddFavorite={handleAddFavoriteMock}
                handleRemoveFavorite={() => { }}
                favoriteMealsList={[]}
            />
        );

        const favoriteButton = screen.getByText('Add to Favorites');
        fireEvent.click(favoriteButton);

        expect(handleAddFavoriteMock).toHaveBeenCalledWith(expect.any(Object), mockRecipe);
    });
})

describe('RecipeInfo component', () => {
    it('renders RecipeInfo component', () => {
        const mockRecipe = {
            name: 'Test Recipe',
            thumbnail: 'test.jpg',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            measurements: ['Measurement 1', 'Measurement 2'],
            instructions: 'Test instructions',
        };

        const mockProps = {
            selectedRecipe: mockRecipe,
            setSelectedRecipe: jest.fn(),
            favoriteMealsList: [],
            setFavoriteMealsList: jest.fn(),
            handleAddFavorite: jest.fn(),
            handleRemoveFavorite: jest.fn(),
        };

        const { getByText, getByAltText } = render(<RecipeInfo {...mockProps} />);

        const backButton = screen.getByText('Back to Recipes');
        const favoriteButton = screen.getByText('Add to Favorites');
        const recipeNameElement = screen.getByText('Test Recipe');
        const thumbnailElement = screen.getByAltText('Test Recipe');
        const ingredient1Element = screen.getByText('Ingredient 1 - Measurement 1');
        const ingredient2Element = screen.getByText('Ingredient 2 - Measurement 2');
        const instructionsElement = screen.getByText('Test instructions');

        expect(backButton).toBeInTheDocument();
        expect(favoriteButton).toBeInTheDocument();
        expect(recipeNameElement).toBeInTheDocument();
        expect(thumbnailElement).toBeInTheDocument();
        expect(ingredient1Element).toBeInTheDocument();
        expect(ingredient2Element).toBeInTheDocument();
        expect(instructionsElement).toBeInTheDocument();
    });

    it('clicking back button calls setSelectedRecipe', () => {
        const mockRecipe = {
            name: 'Test Recipe',
            thumbnail: 'test.jpg',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            measurements: ['Measurement 1', 'Measurement 2'],
            instructions: 'Test instructions',
        };

        const setSelectedRecipeMock = jest.fn();

        const mockProps = {
            selectedRecipe: mockRecipe,
            setSelectedRecipe: setSelectedRecipeMock,
            favoriteMealsList: [],
            setFavoriteMealsList: jest.fn(),
            handleAddFavorite: jest.fn(),
            handleRemoveFavorite: jest.fn(),
        };

        const { getByText } = render(<RecipeInfo {...mockProps} />);

        const backButton = screen.getByText('Back to Recipes');
        fireEvent.click(backButton);

        expect(setSelectedRecipeMock).toHaveBeenCalledWith(null);
    });

    it('clicking favorite button calls handleAddFavorite', () => {
        const mockRecipe = {
            name: 'Test Recipe',
            thumbnail: 'test.jpg',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            measurements: ['Measurement 1', 'Measurement 2'],
            instructions: 'Test instructions',
        };

        const handleAddFavoriteMock = jest.fn();

        const mockProps = {
            selectedRecipe: mockRecipe,
            setSelectedRecipe: jest.fn(),
            favoriteMealsList: [],
            setFavoriteMealsList: jest.fn(),
            handleAddFavorite: handleAddFavoriteMock,
            handleRemoveFavorite: jest.fn(),
        };

        const { getByText } = render(<RecipeInfo {...mockProps} />);

        const favoriteButton = screen.getByText('Add to Favorites');
        fireEvent.click(favoriteButton);

        expect(handleAddFavoriteMock).toHaveBeenCalledWith(expect.any(Object), mockRecipe);
    });
})
