import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the auth slice
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null, 
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );

     
      console.log('Registration response:', response.data);

      if (response.data.success) {
        
        console.log('Dispatching login action after registration for email:', formData.email);

        const loginResponse = await dispatch(
          loginUser({ email: formData.email, password: formData.password })
        );

      
        return loginResponse.payload;
      }

      return response.data; 
    } catch (error) {
      console.error("Registration error:", error); 
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);




// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

// Check Authentication Status

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('No token provided');
    }
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to verify authentication";
      console.error('Authentication check failed:', errorMessage);
      return rejectWithValue(errorMessage); 
    }
  }
);


// Request Password Reset
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password reset request failed");
    }
  }
);



// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }), 
      });
      console.log('debug', response)

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data); 
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestSendOrderAlertEmail = createAsyncThunk(
  "auth/sendOrderAlertEmail",
  async ({ customerEmail, orderDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-order-alert-email",
        { customerEmail, orderDetails },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to send order alert email");
    }
  }
);




// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null; 
    },
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // You can choose to log in here or just set user directly
        state.user = action.payload.user || null; 
        state.isAuthenticated = !!action.payload.user; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Check Authentication Cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Logout User Cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      // Password Reset Request Cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Reset Password Cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setUser, clearError } = authSlice.actions;

export default authSlice.reducer;
