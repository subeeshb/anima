import PocketBase from "pocketbase";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_HOSTNAME = import.meta.env.VITE_API_SERVER_URL ?? "";
const POCKETBASE_AUTH_SESSION_KEY = "pocketbase_auth";

const cachedSessionData = localStorage.getItem(POCKETBASE_AUTH_SESSION_KEY);
let cachedSession = null;
try {
  if (cachedSessionData != null) cachedSession = JSON.parse(cachedSessionData);
} catch (_) {}

export type User = {
  id: string;
  displayName: string;
  isVerified: boolean;
  permissions: string[];
};

interface ServerContextType {
  pb: PocketBase;
  currentUser: User | null;
  token: string | null;

  setLoginSession: (user: User, token: string) => void;
  invalidateLoginSession: () => void;
  currentUserHasPermission: (permission: string) => boolean;
}

const ServerContext = createContext<ServerContextType>({
  pb: new PocketBase(API_HOSTNAME),
  currentUser: null,
  token: null,
  setLoginSession: () => {},
  invalidateLoginSession: () => {},
  currentUserHasPermission: () => false,
});

const ServerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    cachedSession != null
      ? {
          id: cachedSession.record.id,
          displayName: cachedSession.record.name ?? "",
          isVerified: cachedSession.record.verified ?? false,
          permissions: cachedSession.record.permissions ?? [],
        }
      : null
  );
  const [token, setToken] = useState<string | null>(cachedSession?.token);

  const pb = useMemo(() => new PocketBase(API_HOSTNAME), []);

  useEffect(() => {
    const existingSessionData = localStorage.getItem(
      POCKETBASE_AUTH_SESSION_KEY
    );
    if (existingSessionData != null) {
      // Set the cached session data first, then reauth.
      pb.collection("users")
        .authRefresh()
        .then((result) => {
          setToken(result.token);
          setCurrentUser({
            id: result.record.id,
            displayName: result.record.name ?? "",
            isVerified: result.record.verified ?? false,
            permissions: result.record.permissions ?? [],
          });
          console.log("Session refreshed.");
        })
        .catch((e) => {
          console.warn("Unable to refresh existing session.", e);
        });
    }
  }, [pb]);

  const setLoginSession = useCallback((user: User, token: string) => {
    setCurrentUser(user);
    setToken(token);
  }, []);

  const invalidateLoginSession = useCallback(() => {
    setCurrentUser(null);
    setToken(null);

    localStorage.removeItem(POCKETBASE_AUTH_SESSION_KEY);
  }, []);

  const currentUserHasPermission = useCallback(
    (permission: string) =>
      (currentUser?.permissions ?? []).includes(permission),
    [currentUser]
  );

  return (
    <ServerContext.Provider
      value={{
        pb,
        currentUser,
        token,
        setLoginSession,
        invalidateLoginSession,
        currentUserHasPermission,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ServerContext, ServerContextProvider };
