import User from './model.js';

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);

    const user = await newUser.save();

    res.status(200).send(user.profile);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('This email is already registered, please input another email');
    } else {
      res.status(500).send(error);
    }
  }
};
