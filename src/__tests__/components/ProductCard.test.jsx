import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from './ProductCard';
import favoriteReducer from '../../store/favoriteSlice';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  category: 'electronics',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 },
};

const renderWithStore = (store, props = {}) => {
  return render(
    <Provider store={store}>
      <ProductCard product={mockProduct} {...props} />
    </Provider>
  );
};

describe('ProductCard', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoriteReducer,
      },
    });
  });

  it('renders product information correctly', () => {
    renderWithStore(store);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('toggles favorite status when clicking heart icon', () => {
    renderWithStore(store);
    
    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    
    // The button should now show as favorited
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
    
    // Click again to remove
    fireEvent.click(favoriteButton);
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
  });
});