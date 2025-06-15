import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

// Using createSlice from Redux Toolkit to create a slice of the store
const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  // Initial state of the slice -> initialState: initialState (variable), a shorter syntax of writing the same attribute without repeating the key
  initialState,
  reducers: { // Reducers for the slice
    // Each reducer function handles a specific action type
    // The action parameter is an object that contains the type and payload
    // The state parameter is the current state of the slice
    // The state is mutable in Redux Toolkit, so we can directly modify it
    // This is different from the traditional Redux where we return a new state object
    // The payload is optional, and if provided, it will be used to increment the counter by that value
    // If no payload is provided, the counter will be incremented by 1
    increment(state, action) {
      // Incrementing the counter by the payload value if provided, otherwise by 1
      state.counter += action.payload || 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
    toggle(state) {
      // Toggling the visibility of the counter
      state.showCounter = !state.showCounter;
    }
  }
});


// Inside the createStore function, we pass the reducer function from the slice
// This reducer function will handle the actions defined in the slice
// const store = createStore(counterSlice.reducer);

const store = configureStore({
  reducer: counterSlice.reducer // Using the reducer from the slice
});

export const actions = counterSlice.actions; // Extracting the actions from the slice
// Exporting the actions to be used in components
// Each action has their reducer function defined as constants in the actions object
// This allows us to dispatch actions like actions.increment() or actions.decrement() in our components without needing to define them again like writing action creators manually e.g actions.type === 'increment' or actions.type === 'decrement' is not required here

export default store;
