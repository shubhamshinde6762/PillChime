const User = require('../models/User');
const AlexaAccount = require('../models/AlexaAccount');
const AlexaSkill = require('../models/AlexaSkill');
const AlexaReminder = require('../models/AlexaReminder');

exports.linkAccount = async (req, res) => {
  try {
    const { alexaId, accessToken } = req.body;
    const alexaAccount = new AlexaAccount({
      user: req.user._id,
      alexaId,
      accessToken
    });
    await alexaAccount.save();
    res.status(201).json({ message: 'Alexa account linked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error linking Alexa account', error: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await AlexaAccount.find({ user: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Alexa accounts', error: error.message });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { alexaAccountId, skillName, skillId } = req.body;
    const skill = new AlexaSkill({
      alexaAccount: alexaAccountId,
      name: skillName,
      skillId
    });
    await skill.save();
    res.status(201).json({ message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding skill', error: error.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const { alexaAccountId } = req.query;
    const skills = await AlexaSkill.find({ alexaAccount: alexaAccountId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

exports.addReminder = async (req, res) => {
  try {
    const { alexaAccountId, text, scheduledTime } = req.body;
    const reminder = new AlexaReminder({
      alexaAccount: alexaAccountId,
      text,
      scheduledTime
    });
    await reminder.save();
    res.status(201).json({ message: 'Reminder added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reminder', error: error.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const { alexaAccountId } = req.query;
    const reminders = await AlexaReminder.find({ alexaAccount: alexaAccountId });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reminders', error: error.message });
  }
};