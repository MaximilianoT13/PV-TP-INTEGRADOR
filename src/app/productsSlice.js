import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_API = import.meta.env.VITE_URL_API_PRODUCTS;

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get(URL_API);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const { data } = await axios.get(`${URL_API}/${id}`);
    return data;
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    apiProducts: [],
    localProducts: JSON.parse(localStorage.getItem("products")) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    currentItem: null,
    status: 'idle',
    statusFetchById: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.localProducts.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.localProducts))
    },
    editProduct: (state, action) => {
      const {id, local = false}=action.payload
      if(local){
        const index = state.localProducts.findIndex((e)=> e.id === id)
        if(index !== -1)
        {
          state.localProducts[index]=action.payload
          localStorage.setItem("products",JSON.stringify(state.localProducts))
        }      
      }
      else{
        const index = state.apiProducts.findIndex((e)=> e.id === id) 
        if(index !== -1)
          state.apiProducts[index]=action.payload
      }
      state.currentItem=action.payload
    },
    deleteProduct: (state, action) => {
      const {id, local = false } = action.payload
      if(local)
      {
        const index= state.localProducts.findIndex((e)=> e.id === id)
        if(index !== -1)
        {
          state.localProducts.splice(index,1)
          localStorage.setItem("products",JSON.stringify(state.localProducts))
        }
      }
      else{
        const index= state.apiProducts.findIndex((e) => e.id === id)
        if(index !== -1)
          state.apiProducts.splice(index,1)
      }
        state.favorites=state.favorites.filter((e) => e !== id)
        localStorage.setItem("favorites",JSON.stringify(state.favorites))
    },

    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);

      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      // Guardamos los faoritos en el localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    setCurrentItem: (state,action) => {
      state.currentItem=action.payload
    },
    
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch de los productos
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      // Fetch de un producto por ID
      .addCase(fetchProductById.pending, (state) => {
        state.statusFetchById = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.statusFetchById = 'succeeded';
        state.currentItem = action.payload || null;
        if(!state.currentItem)
          state.currentItem = state.localProducts.find((e)=> e.id == action.meta.arg) || null
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.statusFetchById= "failed"
      });
  },
});

// Selector para obtener productos favoritos
export const selectFavorites = (state) => {
  const products = [...state.products.apiProducts,...state.products.localProducts]
  return products.filter(product =>
    state.products.favorites.includes(product.id)
  );
};

export const { addProduct, editProduct, deleteProduct, toggleFavorite, clearFavorites,setCurrentItem } = productsSlice.actions;
export default productsSlice.reducer;