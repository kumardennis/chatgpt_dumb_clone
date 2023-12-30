import * as sharedChatsModel from '../models/sharedChatsModel';
import { Request, Response } from 'express';
import { validateNumberParams } from '../utils/validateNumberParams';
import { sendError, sendSuccess } from '../utils/responseHandlers';

export const getSharedChatByTokenController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token;

    if (typeof token !== 'string') return null;

    const results = await sharedChatsModel.getSharedChatByToken(token);
    sendSuccess(res, 'Successfully fetched chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const transferSharedChatByTokenController = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const new_user_id = req.body.userId;

    if (!validateNumberParams([new_user_id])) return null;

    if (typeof token !== 'string') return null;

    const results = await sharedChatsModel.transferChat(token, new_user_id);
    sendSuccess(res, 'Successfully transfered chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const createSharedChatController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.sharedByUserId;
    const chat_id = req.body.chatId;

    if (!validateNumberParams([user_id, chat_id])) return null;

    const results = await sharedChatsModel.createSharedChat(parseInt(chat_id), parseInt(user_id));
    sendSuccess(res, 'Successfully created chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const deleteChatController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.userId;
    const chat_id = req.body.chatId;

    if (typeof user_id !== 'string' || typeof chat_id !== 'string') return null;

    if (!validateNumberParams([chat_id, user_id])) return null;

    const results = await sharedChatsModel.deleteSharedChat(parseInt(user_id), parseInt(chat_id));
    sendSuccess(res, 'Successfully deleted chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};
