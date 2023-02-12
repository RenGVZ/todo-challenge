const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const usersUrl = "https://jsonplaceholder.typicode.com/users";

const getTodos = async () => {
  try {
    const res = await fetch(todosUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getTodo = async (id) => {
  try {
    const res = await fetch(`${todosUrl}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const todosLoader = async () => {
  const todos = await getTodos();
  return { todos };
};

const getUsers = async () => {
  try {
    const res = await fetch(usersUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const detailsLoader = async ({ params }) => {
  const details = await getDetails(params.id);
  return { details };
};

const getDetails = async (id) => {
  try {
    const todo = await getTodo(id);

    if (!todo) {
      throw new Error(`Failed to fetch todo with id: ${id}`);
    }
    const allUsers = await getUsers();

    if (!allUsers) {
      throw new Error("Failed to fetch allUsers");
    }
    const foundUser = allUsers.find((user) => {
      return user.id === todo.userId;
    });

    if (!foundUser) {
      throw new Error(`Failed to find user with id: ${todo.userId}`);
    }
    const details = {
      id: todo.id,
      creator: foundUser.name,
      title: todo.title,
    };
    return details;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getDetails, todosLoader, detailsLoader };
