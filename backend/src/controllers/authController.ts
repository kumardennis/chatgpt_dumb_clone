import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import * as userModel from '../models/userModel';
import { sendSuccess } from '../utils/responseHandlers';

export const googleAuth = (req: Request, res: Response) => {
  authService.handleAuthentication(req, res);
};

export const githubAuth = (req: Request, res: Response) => {
  authService.handleAuthentication(req, res);
};

export const getCurrentUserController = async (req: Request, res: Response) => {
  const results = await userModel.getCurrentUser();
  sendSuccess(res, 'Fetched user!', results);
};
