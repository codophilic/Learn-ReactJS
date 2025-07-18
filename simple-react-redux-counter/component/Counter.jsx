import { useDispatch, useSelector } from 'react-redux';
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
    dispatch({ type: 'increment' });
  }
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  }

  const incrementHandlerby5 = () => {
    dispatch({ type: 'increment', payload: 5 });
  }

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
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