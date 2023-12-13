import { createSlice } from '@reduxjs/toolkit';

// Get data from localStorage and handle potential parsing errors
//let cartDataFromLocalStorage;
// try {
//   cartDataFromLocalStorage = JSON.parse(localStorage.getItem("Cart")) || [];
// } catch (error) {
//   console.error("Error parsing data from localStorage:", error);
//   cartDataFromLocalStorage = [];
// }
const initialState = JSON.parse(localStorage.getItem('Cart'))??[];
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
     // const idToDelete = action.payload.id;
      return state.filter(item => item && item.id !== action.payload.id);
    }
  }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
