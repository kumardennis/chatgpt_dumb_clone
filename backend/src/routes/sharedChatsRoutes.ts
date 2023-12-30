import express from 'express';
import * as sharedChatsController from '../controllers/sharedChatsController';

const router = express.Router();

router.get('/getSharedChatByToken', sharedChatsController.getSharedChatByTokenController);
router.post('/createSharedChat', sharedChatsController.createSharedChatController);
router.delete('/deleteChat', sharedChatsController.deleteChatController);
router.post('/transferChat', sharedChatsController.transferSharedChatByTokenController);

export default router;
