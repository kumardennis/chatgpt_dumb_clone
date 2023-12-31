import passport from 'passport';
import { findUserByOAuthId, createUser } from '../models/userModel';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { query } from './db.config';

export const localUrl = 'http://localhost:5000';
export const liveUrl = 'https://dumb-gpt-backend.onrender.com';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${liveUrl}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        await query('BEGIN');
        let user = await findUserByOAuthId('google', profile.id);

        if (!user) {
          user = await createUser(
            'google',
            profile.id,
            profile.displayName,
            profile.emails ? profile.emails[0].value : '',
            profile.photos ? profile.photos[0].value : '',
          );
        }

        await query(`SET app.current_user_id TO '${user.id}'`);
        await query("SET app.is_authenticated TO 'true'");

        await query('COMMIT');
        done(null, user);
      } catch (error) {
        await query('ROLLBACK');
        console.error('Error processing Google auth:', error);
        done(error as any);
      }
    },
  ),
);
