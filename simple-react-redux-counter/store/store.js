import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {

  // Handling the case where an action has a payload
  // This allows for incrementing by a specific value, e.g., incrementing by 5
  // when the action payload is provided.
  if (action.type === 'increment' && action.payload) {
    return {
      counter: state.counter + action.payload,
    };
  }
  
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;