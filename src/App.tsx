import { useEffect } from "react";
import "./App.css";
import { useCounterStore } from "./state/CounterStore";
import { useUserStore } from "./state/userStore";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api/users";
import CountProvider, { useCountStore } from "./CountProvider";

const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("count is", count);
};

const setCount = () => {
  useCounterStore.setState({ count: 10 });
};

function App() {
  const count = useCounterStore((state) => state.count);

  return (
    <div>
      <CounterComponent count={count} />
      <hr />
      <UsersComponent />
      <hr />
      <CountProvider initialCount={5}>
        <ContextComponent />
      </CountProvider>
    </div>
  );
}

const CounterComponent = ({ count }: { count: number }) => {
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

const UsersComponent = () => {
  const { filters } = useUserStore();

  const { data } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUser(filters),
  });

  return (
    <div>
      <FilterComponent />
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

//component to set filters in the user store
function FilterComponent() {
  const { setFilters } = useUserStore();

  //Form inputs to set filters
  return <div></div>;
}

export default App;

function ContextComponent() {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);
  console.log(count);

  return (
    <div>
      <h2>Count from Context is {count}</h2>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}
