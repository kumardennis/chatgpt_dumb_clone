import express from 'express';
import * as chatsController from '../controllers/chatsController';

const router = express.Router();

router.get('/getChatsByUser', chatsController.getChatsController);
router.put('/updateChatName', chatsController.updateChatNameController);
router.post('/createChat', chatsController.createChatController);
router.delete('/deleteChat', chatsController.deleteChatController);

export default router;
