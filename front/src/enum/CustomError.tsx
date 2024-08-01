export interface CustomError extends Error {
  statusText?: string;
  status?: number;
}