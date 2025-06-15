import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/store';
import classes from './Counter.module.css';

export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);

  // Extracting showCounter from the Redux store state which will determine if the counter should be displayed or not.
  const showCounter = useSelector((state) => state.showCounter);

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Dispatching actions to the Redux store
  const incrementHandler = () => {
    dispatch(actions.increment()); // Incrementing the counter by 1
  }
  const decrementHandler = () => {
    dispatch(actions.decrement()); // Decrementing the counter by 1
  }

  const incrementHandlerby5 = () => {
    dispatch(actions.increment(5)); // Incrementing the counter by 5: {payload: 5}
    // The payload is optional, if not provided, it will increment by 1
  }

  const toggleCounterHandler = () => {
    dispatch(actions.toggle()); // Toggling the visibility of the counter
  }
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={incrementHandlerby5}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
    )
}