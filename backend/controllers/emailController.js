import EmailModel from '../models/emailModel.js';

const createSubscriptionEmail = async (req, res) => {
  try {
    const { subscribtionEmail } = req.body;

    await EmailModel.create({ subscribtionEmail });
    res.status(201).json('Email Created!');
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createSubscriptionEmail };
