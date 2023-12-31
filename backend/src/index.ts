import express, { Application } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import chatsRoutes from './routes/chatsRoutes';
import sharedChatsRoutes from './routes/sharedChatsRoutes';
import messagesRoutes from './routes/messagesRoutes';
import './config/passport.config';

import bodyParser from 'body-parser';
import { UserSchema } from './schemas/UserSchema';
import cors from 'cors';
import { query } from './config/db.config';
dotenv.config();

/* TODO: Implement JWT */
/* TODO: Implement RLS */

declare namespace Express {
  export interface User {
    id: number;
  }
}

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://dumb-gpt-frontend.onrender.com'],
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  session({
    secret: 'SECRET',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

app.use(async (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    const userId = (req.user as UserSchema).id;

    await query(`SET app.current_user_id TO '${userId}'`);
    await query("SET app.is_authenticated TO 'true'");
  }
  next();
});

// Clear the session variable at the end of the request
app.use(async (req, res, next) => {
  await query('RESET SESSION app.current_user_id');
  next();
});

app.get('/', (req, res) => {
  res.send(`Hello ! ${req.user ? (req.user as UserSchema).display_name : 'Guest'}`);
});

app.use('/auth', authRoutes);

app.use('/chats', passport.authenticate('session'), chatsRoutes);
app.use('/shared-chats', passport.authenticate('session'), sharedChatsRoutes);

app.use('/messages', passport.authenticate('session'), messagesRoutes);

const port = 5000;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
