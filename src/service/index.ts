import { localStorageKeys } from "../constants";
import { ResponseType, ToDo, User, UserLoginResource } from "../types";
import {
  comparePassword,
  encryptPassword,
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";

const registerUser = (payload: User): ResponseType<User> => {
  payload["password"] = encryptPassword(payload.password);
  const user = getUser();
  if (!user) {
    setItemInLocalStorage(localStorageKeys.user, payload);
    return { responseCode: 201, data: payload };
  }
  return { responseCode: 400 };
};

const userLogin = (payload: UserLoginResource): ResponseType<User> => {
  const user = getUser();

  if (!user) {
    return { responseCode: 400 };
  }

  if (user.email !== payload.email) return { responseCode: 400 };

  if (!comparePassword(payload.password, user.password))
    return { responseCode: 400 };

  return { responseCode: 200, data: user };
};

const getUser = () => {
  const user = getItemFromLocalStorage(localStorageKeys.user);
  if (!user) return undefined;
  return JSON.parse(user) as User;
};

const getAllToDos = (): ToDo[] => {
  const todos = getItemFromLocalStorage(localStorageKeys.todos);
  if (!todos) return [];
  return JSON.parse(todos);
};

const saveTodo = (payload: ToDo): ResponseType<ToDo> => {
  const todos = getAllToDos();
  todos.push(payload);
  setItemInLocalStorage(localStorageKeys.todos, todos);
  return {
    responseCode: 201,
  };
};

const updateTodo = (payload: ToDo): ResponseType<ToDo> => {
  const todos = getAllToDos();
  const index = todos.findIndex((item) => item.id === payload.id);
  todos[index] = payload;
  setItemInLocalStorage(localStorageKeys.todos, todos);
  return {
    responseCode: 200,
  };
};

const deleteTodo = (todoId: string): ResponseType<ToDo> => {
  const todos = getAllToDos();
  const newTodos = todos.filter((item) => item.id !== todoId);
  setItemInLocalStorage(localStorageKeys.todos, newTodos);
  return {
    responseCode: 200,
  };
};

export {
  registerUser,
  userLogin,
  getAllToDos,
  saveTodo,
  updateTodo,
  deleteTodo,
};
