import { query } from '../config/db.config';

export const getChatsByUser = async (user_id: number) => {
  const result = await query('SELECT * FROM chats WHERE created_by = $1 ORDER BY created_at DESC;', [user_id]);
  return result.rows;
};

export const updateChatName = async (user_id: number, chat_id: number, new_name: string) => {
  const result = await query('UPDATE chats SET name = $3 WHERE created_by = $1 AND id = $2 RETURNING *;', [user_id, chat_id, new_name]);
  return result.rows;
};

export const createChat = async (user_id: number, name: string) => {
  const result = await query('INSERT INTO chats (name, created_by, created_at, updated_at) VALUES ($2, $1, NOW(), NOW()) RETURNING *;', [
    user_id,
    name,
  ]);
  return result.rows;
};

export const deleteChat = async (user_id: number, chat_id: number) => {
  const result = await query('DELETE FROM chats WHERE created_by = $1 AND id = $2 RETURNING *;', [user_id, chat_id]);
  return result.rows;
};
