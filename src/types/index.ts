export interface User {
  email: string;
  name: string;
  id: string;
  password: string;
}

export interface UserLoginResource {
  email: string;
  password: string;
}

export interface ResponseType<T> {
  responseCode: number;
  data?: T;
}

export interface ToDo {
  id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_COMPLETED";
}
