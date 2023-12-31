import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleAuth);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.githubAuth);

router.get('/get-user', authController.getCurrentUserController);

export default router;
