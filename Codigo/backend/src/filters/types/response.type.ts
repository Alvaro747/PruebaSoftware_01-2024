export type ResponseType = {
  success: boolean;
  statusCode: number;
  timestamp?: string;
  path?: string;
  message: string;
  result: object[] | object | null;
};
