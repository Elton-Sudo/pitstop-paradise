import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Thunk for getting feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/common/feature/get`);
    return response.data;
  }
);

// Thunk for adding a feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(`http://localhost:5000/api/common/feature/add`, { image });
    return response.data;
  }
);

// Thunk for deleting a feature image
export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (imageId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/common/feature/delete/${imageId}`);
      console.log('Delete response:', response.data); // Check response
      return response.data;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
);

// Create the commonSlice
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getFeatureImages
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      // Handle deleteFeatureImage
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        // Filter out the deleted image from the list
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.meta.arg // Ensure to match the correct identifier
        );
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false; // Reset loading state on error
      });
  },
});

export default commonSlice.reducer;
