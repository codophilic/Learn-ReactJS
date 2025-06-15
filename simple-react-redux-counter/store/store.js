import { createStore } from 'redux';

const counterReducer = (state = { counter: 0, showCounter: true }, action) => {

  // Handling the case where an action has a payload
  // This allows for incrementing by a specific value, e.g., incrementing by 5
  // when the action payload is provided.
  // showCounter will maintain its value unless explicitly changed by another action.
  if (action.type === 'increment' && action.payload) {
    return {
      counter: state.counter + action.payload,
      showCounter: state.showCounter
    };
  }
  
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  // Adding a new action type to toggle the visibility of the counter
  if (action.type === 'toggle') {
    return {
      counter: state.counter, 
      // Toggling the showCounter state, if it was true (show), it becomes false(hide) and vice versa
      showCounter: !state.showCounter
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;