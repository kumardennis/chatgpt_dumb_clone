import { query } from '../config/db.config';

export const getUsersData = async () => {
  const res = await query('SELECT * FROM users');
  return res.rows;
};

export const findUserByOAuthId = async (oauthProvider: string, oauthId: string) => {
  const result = await query('SELECT * FROM users WHERE oauth_provider = $1 AND oauth_id = $2', [oauthProvider, oauthId]);
  return result.rows[0];
};

export const getCurrentUser = async () => {
  const result = await query('SELECT * FROM users WHERE id = current_user_id() ', []);
  return result.rows[0];
};

export const createUser = async (oauthProvider: string, oauthId: string, displayName: string, email: string, profilePicture: string) => {
  const result = await query(
    'INSERT INTO users (oauth_provider, oauth_id, display_name, email, profile_picture) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [oauthProvider, oauthId, displayName, email, profilePicture],
  );
  return result.rows[0];
};
