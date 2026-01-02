import { configureStore } from '@reduxjs/toolkit';
import productReducer, {
  fetchProducts,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
} from './productSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('productSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().products).toEqual({
      items: [],
      filteredItems: [],
      categories: [],
      selectedProduct: null,
      loading: false,
      error: null,
      searchTerm: '',
      selectedCategory: 'all',
      sortBy: 'default',
    });
  });

  it('should handle setSearchTerm', () => {
    store.dispatch(setSearchTerm('test'));
    expect(store.getState().products.searchTerm).toBe('test');
  });

  it('should handle setSelectedCategory', () => {
    store.dispatch(setSelectedCategory('electronics'));
    expect(store.getState().products.selectedCategory).toBe('electronics');
  });

  it('should handle setSortBy', () => {
    store.dispatch(setSortBy('price-low-high'));
    expect(store.getState().products.sortBy).toBe('price-low-high');
  });

  it('should handle clearFilters', () => {
    store.dispatch(setSearchTerm('test'));
    store.dispatch(setSelectedCategory('electronics'));
    store.dispatch(setSortBy('price-low-high'));
    
    store.dispatch(clearFilters());
    
    expect(store.getState().products.searchTerm).toBe('');
    expect(store.getState().products.selectedCategory).toBe('all');
    expect(store.getState().products.sortBy).toBe('default');
  });

  describe('async thunks', () => {
    afterEach(() => {
      mock.reset();
    });

    it('should fetch products successfully', async () => {
      const mockProducts = [{ id: 1, title: 'Test Product' }];
      mock.onGet('https://fakestoreapi.com/products').reply(200, mockProducts);

      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.items).toEqual(mockProducts);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should handle fetch products failure', async () => {
      mock.onGet('https://fakestoreapi.com/products').reply(500);

      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeTruthy();
    });
  });
});