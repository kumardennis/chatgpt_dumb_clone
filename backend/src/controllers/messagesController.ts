import * as messagesModel from '../models/messagesModel';
import { Request, Response } from 'express';
import { validateNumberParams } from '../utils/validateNumberParams';
import { sendError, sendSuccess } from '../utils/responseHandlers';
import { getRandomSentence } from '../utils/getRandomSentence';

export const getMessagesController = async (req: Request, res: Response) => {
  try {
    const user_id = req.query.userId;
    const chat_id = req.query.chatId;

    if (typeof user_id !== 'string' || typeof chat_id !== 'string') return null;

    if (user_id === null ? !validateNumberParams([chat_id]) : !validateNumberParams([chat_id, user_id])) return null;

    const results = await messagesModel.getMessagesFromChat(user_id ? parseInt(user_id) : null, parseInt(chat_id));
    sendSuccess(res, 'Successfully fetched messages!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const updateMessagesController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.userId;
    const chat_id = req.body.chatId;
    const message_id = req.body.messageId;
    const new_message = req.body.newMessage;

    if (typeof new_message !== 'string' || new_message === '') return null;

    if (!validateNumberParams([chat_id, user_id, message_id])) return null;

    const results = await messagesModel.updateMessage(parseInt(user_id), parseInt(chat_id), parseInt(message_id), new_message);
    sendSuccess(res, 'Successfully updated message!', results);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};

export const createMessagesController = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.userId;
    const chat_id = req.body.chatId;
    const new_message = req.body.newMessage;

    if (typeof new_message !== 'string' || new_message === '') return null;

    if (!validateNumberParams([chat_id, user_id])) return null;

    const results = await messagesModel.createMessage(parseInt(user_id), parseInt(chat_id), new_message);
    const addGptMessageResults = await messagesModel.createMessage(null, parseInt(chat_id), getRandomSentence(200));

    sendSuccess(res, 'Successfully created message!', [...results, ...addGptMessageResults]);
  } catch (error) {
    sendError(res, 500, 'Internal Server Error', error);
  }
};
