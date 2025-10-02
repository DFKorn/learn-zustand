import "./App.css";
import { useCounterStore } from "./store";

function App() {
  const count = useCounterStore((state) => state.count);

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  return (
    <div>
      count is {count}
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={incrementAsync}>Increment Async</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default App;
