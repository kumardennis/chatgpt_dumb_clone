import { query } from '../config/db.config';
import { createChat } from './chatsModel';
import { createMessage } from './messagesModel';

export const getSharedChatByToken = async (share_token: string) => {
  const result = await query('SELECT * FROM shared_chats WHERE share_token  = $1 ORDER BY created_at DESC;', [share_token]);
  return result.rows;
};

export const getSharedChatByUserIdAndChatId = async (chat_id: number, shared_by_user_id: number) => {
  const result = await query('SELECT * FROM shared_chats WHERE chat_id  = $1 AND shared_by_user_id  = $2 ORDER BY created_at DESC;', [
    chat_id,
    shared_by_user_id,
  ]);
  return result.rows;
};

export const createSharedChat = async (chat_id: number, shared_by_user_id: number) => {
  const queryText = 'INSERT INTO shared_chats (chat_id, shared_by_user_id) VALUES ($1, $2) RETURNING share_token';
  const result = await query(queryText, [chat_id, shared_by_user_id]);
  return result.rows[0].share_token;
};

export const deleteSharedChat = async (user_id: number, chat_id: number) => {
  const result = await query('DELETE FROM chats WHERE created_by = $1 AND id = $2 RETURNING *;', [user_id, chat_id]);
  return result.rows;
};

export const transferChat = async (token: string, new_user_id: number) => {
  await query('BEGIN');

  try {
    const sharedChatQuery = 'SELECT * FROM shared_chats WHERE share_token = $1';
    const sharedChatResult = await query(sharedChatQuery, [token]);
    const sharedChat = sharedChatResult.rows[0];

    if (!sharedChat) {
      throw new Error('Shared chat not found');
    }

    // Duplicate messages from the shared chat to the new chat
    // Get messages from the original chat
    const messagesQuery = 'SELECT * FROM messages WHERE chat_id = $1';
    const originalChatId = sharedChat.chat_id;
    const messagesResult = await query(messagesQuery, [originalChatId]);
    const messages = messagesResult.rows;

    // Create a new chat entry based on the shared chat's snapshot

    const newChat = await createChat(new_user_id, messages[0].text.slice(0, 50));

    const newChatId = await newChat[0].id;

    for (const message of messages) {
      await createMessage(message.user_id !== null ? new_user_id : null, newChatId, message.text);
    }

    await query('COMMIT');

    return newChatId;
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};
