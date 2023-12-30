export interface ResponseSuccessModel {
  success: true;
  message: string;
}

export interface ResponseErrorModel {
  success: false;
  message: string;
  error: string;
}
