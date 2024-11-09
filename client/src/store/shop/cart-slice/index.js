import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("guestCart")) || [], // Initialize with localStorage for guest
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, flavor, quantity }, { rejectWithValue }) => {
    console.log("Adding to cart:", { userId, productId, flavor, quantity });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        { userId, productId, quantity, flavor }
      );
      
      // Update the guest cart in localStorage if not logged in
      if (!userId) {
        const updatedCart = response.data.data; // Get the updated cart from API
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }

      console.log("API response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User ID is missing");
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

export const fetchGuestCartItems = createAsyncThunk(
  "cart/fetchGuestCartItems",
  async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    return guestCart;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      // For logged-in users, call the API
      if (userId) {
        const response = await axios.delete(
          `http://localhost:5000/api/shop/cart/${userId}/${productId}`
        );
        return response.data;
      } else {
        // For guests, remove the item from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.filter(item => item.productId !== productId);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        return { data: updatedCart };  // Return updated guest cart
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      return rejectWithValue(error.response?.data || "Error deleting item");
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      // For logged-in users, call the API
      if (userId) {
        const response = await axios.put(
          "http://localhost:5000/api/shop/cart/update-cart",
          { userId, productId, quantity }
        );
        return response.data;
      } else {
        // For guests, update the quantity in localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        return { data: updatedCart };  // Return updated guest cart
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      return rejectWithValue(error.response?.data || "Error updating quantity");
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        // Update localStorage if the user is a guest
        if (!action.payload.userId) {
          localStorage.setItem("guestCart", JSON.stringify(action.payload.data));
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchGuestCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuestCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchGuestCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
