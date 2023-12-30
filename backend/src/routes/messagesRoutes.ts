import express from 'express';
import * as messagesController from '../controllers/messagesController';

const router = express.Router();

router.get('/getMessages', messagesController.getMessagesController);
router.put('/updateMessage', messagesController.updateMessagesController);
router.post('/createMessage', messagesController.createMessagesController);

export default router;
