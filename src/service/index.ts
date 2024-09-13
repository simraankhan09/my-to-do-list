import { localStorageKeys } from "../constants";
import { ResponseType, User, UserLoginResource } from "../types";
import {
  comparePassword,
  deleteItemFromLocalStorage,
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

const userLogout = () => {
  deleteItemFromLocalStorage(localStorageKeys.user);
};

const getUser = () => {
  const user = getItemFromLocalStorage(localStorageKeys.user);
  if (!user) return undefined;
  return JSON.parse(user) as User;
};

export { registerUser, userLogin, userLogout };
