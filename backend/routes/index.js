const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const alexaController = require('../controllers/alexaController');
const { authenticateUser } = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

router.post('/alexa/link', authenticateUser, alexaController.linkAccount);
router.get('/alexa/accounts', authenticateUser, alexaController.getAccounts);

router.post('/alexa/skills', authenticateUser, alexaController.addSkill);
router.get('/alexa/skills', authenticateUser, alexaController.getSkills);

router.post('/alexa/reminders', authenticateUser, alexaController.addReminder);
router.get('/alexa/reminders', authenticateUser, alexaController.getReminders);

const upload = require('../middlewares/upload');
const prescriptionController = require('../controllers/prescriptionController');

router.post('/prescription/process-text/', prescriptionController.processPrescription);

router.get('/prescription/:userId', prescriptionController.getPrescriptions);


module.exports = router;