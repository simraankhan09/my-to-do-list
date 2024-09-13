import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, UserLoginResource } from "../types";
import { registerUser, userLogin, userLogout } from "../service";
import { getItemFromLocalStorage } from "../utils";
import { localStorageKeys } from "../constants";
import { Spin } from "antd";

type AuthenticationContextType = {
  user?: User | null;
  login?: (payload: UserLoginResource) => number;
  register?: (payload: User) => number;
  logout?: (userId: string) => void;
};

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const user = getItemFromLocalStorage(localStorageKeys.user);
    if (!user) {
      setUser(null);
      return;
    }

    setUser(JSON.parse(user));
  }, []);

  const login = (payload: UserLoginResource) => {
    const { responseCode, data } = userLogin(payload);

    if (responseCode === 200) {
      setUser(data);
    }

    return responseCode;
  };

  const register = (payload: User) => {
    const { responseCode, data } = registerUser(payload);
    if (responseCode === 201) {
      setUser(data);
    }
    return responseCode;
  };

  const logout = () => {
    setUser(null);
    return userLogout();
  };

  if (user === undefined) {
    return <Spin></Spin>;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "useAuth has to be used within <AuthenticationContext.Provider>"
    );

  return context;
};
