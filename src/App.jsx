import React, { useState, useEffect } from "react";
import TodoContainer from "./TodoContainer.jsx";
import TodoCard from "./TodoCard.jsx";
import { useLoaderData } from "react-router-dom";
import SearchBar from "./SearchBar.jsx"

// Home function that is reflected across the site
export default function App() {
  const { todos } = useLoaderData();
  const [todoList, setTodoList] = useState(todos);
  const [query, setQuery] = useState("");

  const getAutoCompleteResults = () => {
    const filtered = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
    setTodoList(filtered);
  };

  useEffect(() => {
    (async () => {
      if(!query) {
        setTodoList(todos)
        return
      }
      getAutoCompleteResults(query);
    })();
  }, [query]);

  return (
    <>
      <main role="main" className="wrapper">
        <h1>Welcome to the TODO app code challenge.</h1>
        <p>
          Please read the instructions in the README carefully to develop and
          submit your code challenge.
        </p>
      </main>
      <div className="app">
        <SearchBar query={query} handleChange={setQuery}/>

        <TodoContainer>
          {Object.keys(todoList).length > 0 ? (
            todoList.map((todo) => <TodoCard key={todo.id} item={todo} />)
          ) : (
            <p>no results</p>
          )}
        </TodoContainer>
      </div>
    </>
  );
}
