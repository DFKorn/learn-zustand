import { useEffect } from "react";
import "./App.css";
import { useCounterStore } from "./store";

const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("count is", count);
};

const setCount = () => {
  useCounterStore.setState({ count: 10 });
};

function App() {
  const count = useCounterStore((state) => state.count);

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);

  useEffect(() => {
    setCount();
    logCount();
  }, []);

  return (
    <div>
      <h2>Count is {count}</h2>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={incrementAsync}>Increment Async</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default App;
