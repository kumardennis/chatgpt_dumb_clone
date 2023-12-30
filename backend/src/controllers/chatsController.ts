import * as chatsModel from '../models/chatsModel';
import { Request, Response } from 'express';
import { validateNumberParams } from '../utils/validateNumberParams';
import { sendError, sendSuccess } from '../utils/responseHandlers';

export const getChatsController = async (req: Request, res: Response) => {
  try {
    const user_id = req.query.userId;

    if (typeof user_id !== 'string') return null;
    if (!validateNumberParams([user_id])) return null;

    const results = await chatsModel.getChatsByUser(parseInt(user_id));
    sendSuccess(res, 'Successfully fetched chats!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const updateChatNameController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.userId;
    const chat_id = req.body.chatId;
    const new_name = req.body.newName;

    if (typeof new_name !== 'string' || new_name === '') return null;

    if (!validateNumberParams([chat_id, user_id])) return null;

    const results = await chatsModel.updateChatName(parseInt(user_id), parseInt(chat_id), new_name);
    sendSuccess(res, 'Successfully updated chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const createChatController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.userId;
    const new_name = req.body.newName;

    if (typeof new_name !== 'string' || new_name === '') return null;

    if (!validateNumberParams([user_id])) return null;

    const results = await chatsModel.createChat(parseInt(user_id), new_name);
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

    const results = await chatsModel.deleteChat(parseInt(user_id), parseInt(chat_id));
    sendSuccess(res, 'Successfully deleted chat!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};
