export interface ResponseData<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
