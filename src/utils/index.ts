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

const validateEmail = (email: string) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email.toLowerCase());
};

const validatePassword = (password: string) => {
  const regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return regEx.test(password);
};

export {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  deleteItemFromLocalStorage,
  encryptPassword,
  comparePassword,
  validateEmail,
  validatePassword,
};
