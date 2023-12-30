import { query } from '../config/db.config';
import { MessageSchema } from '../schemas/MessageSchema';

export const getMessagesFromChat = async (user_id: number | null, chat_id: number): Promise<MessageSchema[]> => {
  const queryText = 'SELECT * FROM messages WHERE chat_id = $1 AND (user_id = $2 OR user_id IS NULL);';
  const queryParams = [chat_id, user_id];

  const result = await query(queryText, queryParams);
  return result.rows;
};

export const updateMessage = async (user_id: number, chat_id: number, message_id: number, new_message: string): Promise<MessageSchema[]> => {
  const result = await query('UPDATE messages SET text = $4 WHERE user_id = $1 AND chat_id = $2 AND id = $3 RETURNING *;', [
    user_id,
    chat_id,
    message_id,
    new_message,
  ]);
  return result.rows;
};

export const createMessage = async (user_id: number | null, chat_id: number, new_message: string): Promise<MessageSchema[]> => {
  const result = await query('INSERT INTO messages (chat_id, user_id, text, created_at) VALUES ($2, $1, $3, NOW()) RETURNING *;', [
    user_id,
    chat_id,
    new_message,
  ]);
  return result.rows;
};
