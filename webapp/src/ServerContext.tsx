import PocketBase from "pocketbase";
import { createContext, PropsWithChildren, useCallback, useState } from "react";

const API_HOSTNAME = import.meta.env.VITE_API_SERVER_URL ?? "";

export type User = {
  id: string;
  displayName: string;
  isVerified: boolean;
};

interface ServerContextType {
  pb: PocketBase;
  currentUser: User | null;
  token: string | null;

  setLoginSession: (user: User, token: string) => void;
  invalidateLoginSession: () => void;
}

const ServerContext = createContext<ServerContextType>({
  pb: new PocketBase(API_HOSTNAME),
  currentUser: null,
  token: null,
  setLoginSession: () => {},
  invalidateLoginSession: () => {},
});

const ServerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setLoginSession = useCallback((user: User, token: string) => {
    setCurrentUser(user);
    setToken(token);
  }, []);

  const invalidateLoginSession = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
  }, []);

  return (
    <ServerContext.Provider
      value={{
        pb: new PocketBase(API_HOSTNAME),
        currentUser,
        token,
        setLoginSession,
        invalidateLoginSession,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ServerContext, ServerContextProvider };
