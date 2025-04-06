// This file is autogenerated. Do not edit this code manually as changes may be lost.
// To update, go to the 'server' folder, edit the API implementation in RefreshToken.api.ts, then run 'npm run link-api .\src\api_endpoints\authentication\RefreshToken.api.ts'.

import APIRequest from "../APIRequest";

class RefreshTokenAPI extends APIRequest<
  {},
  {
    result: "success" | "failed" | "invalidate_session";
    token?: string;
  }
> {
  constructor() {
    super({
      path: "/auth/refresh",
      method: "post",
      requireAuthentication: true,
    });
  }
}

export default RefreshTokenAPI;
