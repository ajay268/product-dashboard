import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
    searchTerm: '',
    selectedCategory: 'all',
    sortBy: 'default',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.sortBy = 'default';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

// Helper function for filtering and sorting
const applyFilters = (state) => {
  let filtered = [...state.items];

  // Filter by search term
  if (state.searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  // Filter by category
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(product =>
      product.category === state.selectedCategory
    );
  }

  // Sort
  if (state.sortBy === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  state.filteredItems = filtered;
};

// Selectors
export const selectAllProducts = (state) => state.products.filteredItems;
export const selectProductById = (state, id) =>
  state.products.items.find(product => product.id === parseInt(id));
export const selectCategories = (state) => state.products.categories;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSortBy = (state) => state.products.sortBy;

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;