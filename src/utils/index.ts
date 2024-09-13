import bcrypt from "bcryptjs-react";

const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item === null ? undefined : item;
};

const setItemInLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const deleteItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

const encryptPassword = (rawPassword: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(rawPassword, salt);
};

const comparePassword = (rawPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};

export {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  deleteItemFromLocalStorage,
  encryptPassword,
  comparePassword,
};
