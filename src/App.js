import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { createTask } from "./graphql/mutations";
import { listTasks } from "./graphql/queries";
import React ,{ useEffect, useState } from "react";

function App() {
  
  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  const [tasks, setTasks] = useState({
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task);
    const result = await API.graphql(
      graphqlOperation(createTask, { input: task })
    );
    console.log(result);
  };
  useEffect(() => {
    async function loadTasks() {
      const result = await API.graphql(graphqlOperation(listTasks));
      setTasks(result.data.listTasks.items);
    }
    loadTasks();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        ></input>
        <textarea
          name="description"
          placeholder="description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <button>Submit</button>
      </form>
      {JSON.stringify(tasks)}
    </>
  );
}

export default App;
