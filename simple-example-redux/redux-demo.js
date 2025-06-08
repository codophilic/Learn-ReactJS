const redux = require('redux');

// Reducer function
/**
 * Here, we define a reducer function that takes the current state and an action,
 * and returns a new state based on the action type.
 * The state is initialized with a default value of { count: 0 }.
 * The reducer handles two action types: 'INCREMENT' and 'DECREMENT'.
 * When 'INCREMENT' is dispatched, it increases the count by 1.
 * When 'DECREMENT' is dispatched, it decreases the count by 1.
 * If the action type is not recognized, it returns the current state unchanged.
 * This is a pure function, meaning it does not have side effects and always returns the same output for the same input.
 */
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}


// Creating a Store
const store = redux.createStore(reducer); //Passing the reducer to store

// Subscribe to store updates
// This function will be called whenever the state changes
// It logs the updated state to the console.
const subscription = () => {
  console.log('State updated:', store.getState());
};

store.subscribe(subscription); // Register the subscription function


// Dispatching actions modify the state based on the reducer logic. In reducer function,
// we defined how the state should change in response to different actions.
store.dispatch({ type: 'INCREMENT' }); // Dispatch an action to increment the count
store.dispatch({ type: 'INCREMENT' }); // Dispatch another action to increment the count
store.dispatch({ type: 'DECREMENT' }); // Dispatch an action to decrement the count
store.dispatch({ type: 'UNKNOWN' }); // Dispatch an action with an unknown type (no change expected)
// The subscription function will log the updated state after each dispatch
