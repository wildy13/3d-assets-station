import slug from 'slug';

import Category from './model.js';

export const getAll = async (req, res) => {
  try {
    const items = await Category.find({});

    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newItem = new Category({ name, slug: slug(name) });

    const item = await newItem.save();

    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    Object.assign(category, { name, slug: slug(name) });

    const item = await category.save();

    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).send(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }
};
