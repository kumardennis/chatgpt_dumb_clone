import { Response } from 'express';

export const sendSuccess = (res: Response, message: string, data: any) => {
  res.status(200).json({ success: true, message, data });
};

export const sendError = (res: Response, statusCode: number, message: string, errorDetails: any) => {
  res.status(statusCode).json({ success: false, message, error: errorDetails });
};
