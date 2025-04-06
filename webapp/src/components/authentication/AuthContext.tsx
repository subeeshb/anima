import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CookieUtils from "../../utils/CookieUtils";
import { getSHA1Hash, parseJwt } from "../../utils/CryptoUtils";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import RefreshTokenAPI from "../../api/endpoints/RefreshToken.api";
import { useNavigate } from "react-router-dom";

export const AUTH_COOKIE_NAME = "pmd3-auth-session";

let tokenRenewalInterval: any;

function loadSessionFromSavedJWT(): Session | null {
  const token = CookieUtils.getCookie(AUTH_COOKIE_NAME);
  if (token != null) {
    const data = parseJwt(token);
    const expiry = new Date(data.exp * 1000);
    return {
      token,
      userID: data.uid,
      displayName: data.display_name,
      expiry,
      permissionTokens: data.permissions,
    };
  }

  return null;
}

interface Session {
  token: string;
  userID: string;
  displayName: string;
  expiry: Date;
  permissionTokens: string[];
}

interface AuthContextType {
  session: Session | null;
  isLoggedIn: () => boolean;
  parseSessionFromToken: (token: string, saveToken: boolean) => void;
  clearSession: () => void;
  currentUserHasPermission: (permissionName: string) => Promise<boolean>;
  graphQLClient?: ApolloClient<NormalizedCacheObject>;
}

const AuthContext = createContext<AuthContextType>({
  session: loadSessionFromSavedJWT(),
  isLoggedIn: () => {
    return false;
  },
  parseSessionFromToken: () => {},
  clearSession: () => {},
  currentUserHasPermission: async () => false,
});

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(
    loadSessionFromSavedJWT()
  );

  const isLoggedIn = useCallback(() => {
    if (session == null) return false;
    if (session.expiry < new Date()) return false;

    return true;
  }, [session]);

  const parseSessionFromToken = useCallback(
    (token: string, saveToken: boolean) => {
      const data = parseJwt(token);
      const expiry = new Date(data.exp * 1000);
      setSession({
        token,
        userID: data.uid,
        displayName: data.display_name,
        expiry,
        permissionTokens: data.permissions,
      });

      if (saveToken) {
        CookieUtils.setCookie(AUTH_COOKIE_NAME, token, expiry);
      }
    },
    []
  );

  const currentUserHasPermission = useCallback(
    async (permissionName: string) => {
      if (session == null) return false;

      const permissionHash = await getSHA1Hash(
        `${session.userID}/${permissionName}`
      );
      return session.permissionTokens.includes(permissionHash);
    },
    [session]
  );

  const clearSession = useCallback(() => {
    CookieUtils.deleteCookie(AUTH_COOKIE_NAME);
    setSession(null);
  }, []);

  const client = useMemo(() => {
    return session != null
      ? new ApolloClient({
          uri: `${import.meta.env.VITE_API_SERVER_URL ?? ""}/graphql`,
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          cache: new InMemoryCache(),
        })
      : new ApolloClient({
          uri: `${import.meta.env.VITE_API_SERVER_URL ?? ""}/graphql`,
          cache: new InMemoryCache(),
        });
  }, [session]);

  useEffect(() => {
    const refreshToken = () => {
      // If the JWT was issued more than an hour ago, renew it.
      if (session?.token == null) return;

      const tokenData = parseJwt(session.token);
      if (tokenData.iat == null) return;

      const threshold = new Date().getTime() / 1000 - 3600;
      if (tokenData.iat > threshold) return;

      new RefreshTokenAPI().fetch({}).then((result) => {
        if (result.result === "invalidate_session") {
          clearSession();
          navigate("/");
        } else if (result.result === "success" && result.token != null) {
          parseSessionFromToken(result.token, true);
        } else {
          console.warn("Error refreshing token.");
        }
      });
    };

    if (tokenRenewalInterval != null) {
      clearInterval(tokenRenewalInterval);
    }
    tokenRenewalInterval = setInterval(() => {
      refreshToken();
    }, 30000);
    refreshToken();
  }, [session, navigate, clearSession, parseSessionFromToken]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoggedIn,
        parseSessionFromToken,
        clearSession,
        currentUserHasPermission,
        graphQLClient: client,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
