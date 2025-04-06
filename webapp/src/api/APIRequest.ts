import { AUTH_COOKIE_NAME } from "../components/authentication/AuthContext";
import CookieUtils from "../utils/CookieUtils";
import { getSHA1Hash, parseJwt } from "../utils/CryptoUtils";
import { joinURL } from "../utils/StringUtils";

const API_HOSTNAME = import.meta.env.VITE_API_SERVER_URL ?? "";

export type APIRoute = {
  method:
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options"
    | "head"
    | "all";
  path: string;
  requireAuthentication?: boolean;
  requireAllOfPermissions?: string[];
  requireAnyOfPermissions?: string[];
};

class APIRequest<TRequestPayload = any, TResponsePayload = any> {
  protected _route: APIRoute;

  constructor(route: APIRoute) {
    this._route = route;
  }

  private _getJWT(): string | null {
    return CookieUtils.getCookie(AUTH_COOKIE_NAME);
  }

  private async _meetsPermissionRequirements(
    jwt: string | null
  ): Promise<boolean> {
    if (
      this._route.requireAllOfPermissions == null &&
      this._route.requireAnyOfPermissions == null
    )
      return true;

    if (jwt == null) return false;

    const tokenData = parseJwt(jwt);

    const getResultsForPermissions = async (
      permissions: string[]
    ): Promise<boolean[]> => {
      return await Promise.all(
        permissions.map(async (permission) => {
          const permissionHash = await getSHA1Hash(
            `${tokenData.uid}/${permission}`
          );
          return (tokenData.permissions as string[]).includes(permissionHash);
        })
      );
    };

    if (this._route.requireAllOfPermissions != null) {
      const allPermsResult = await getResultsForPermissions(
        this._route.requireAllOfPermissions
      );
      if (allPermsResult.some((result) => result === false)) {
        return false;
      }
    }

    if (this._route.requireAnyOfPermissions != null) {
      const anyPermsResult = await getResultsForPermissions(
        this._route.requireAnyOfPermissions
      );
      if (anyPermsResult.every((result) => result === false)) {
        return false;
      }
    }

    return true;
  }

  private async _makeApiRequest(params: TRequestPayload): Promise<Response> {
    const url = joinURL(API_HOSTNAME, this._route.path);
    const jwt = this._getJWT();

    if (
      jwt == null &&
      (this._route.requireAuthentication === true ||
        this._route.requireAllOfPermissions != null ||
        this._route.requireAnyOfPermissions != null)
    ) {
      throw new Error(
        `The API ${this.constructor.name} requires authentication but the current session is unauthenticated.`
      );
    }

    const hasPermission = await this._meetsPermissionRequirements(jwt);
    if (!hasPermission) {
      throw new Error(
        `The API ${this.constructor.name} requires one or more permissions not present in the current session.`
      );
    }

    const headers: { [key: string]: string } = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (jwt != null) {
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    let options: RequestInit = {
      headers,
      method: this._route.method,
    };

    if (this._route.method.toUpperCase() === "GET") {
      const queryString =
        params != null
          ? new URLSearchParams(JSON.parse(JSON.stringify(params))).toString()
          : "";
      const fullUrl = `${url}?${queryString}`;
      return await fetch(fullUrl, {
        headers: options.headers,
        method: options.method,
      });
    } else {
      if (params != null) {
        options.body = JSON.stringify(params);
      }
      return await fetch(url, options);
    }
  }

  async fetch(params: TRequestPayload): Promise<TResponsePayload> {
    const response = await this._makeApiRequest(params);
    const result = await response.json();
    return result;
  }
}

export default APIRequest;
