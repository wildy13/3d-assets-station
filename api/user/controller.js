import User from './model.js';

export const getAll = async (req, res) => {
  try {
    const users = await User.find({}, '-password');

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    res.status(200).send({ user: user.profile });
  } catch (err) {
    res.status(500).send(err);
  }
};

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
