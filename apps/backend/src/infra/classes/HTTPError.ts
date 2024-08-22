export type HTTPErrorStatusTitle =
  | "Bad request"
  | "Unauthorized"
  | "Forbidden"
  | "Not found"
  | "Internal server error"
  | "Not implemented";

export enum HTTPErrorStatusCode {
  "Bad request" = 400,
  "Unauthorized" = 401,
  "Forbidden" = 403,
  "Not found" = 404,
  "Internal server error" = 500,
  "Not implemented" = 501,
}
export class HTTPError extends Error {
  public message: string;
  public code: number;
  constructor(
    protected title: HTTPErrorStatusTitle,
    message?: string
  ) {
    super(message ?? title);
    this.code = HTTPErrorStatusCode[title];
  }
}
