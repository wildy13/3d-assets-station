import slug from 'slug';
import fs from 'node:fs';
import util from 'node:util';
import { pipeline } from 'node:stream';

import Category from '../category/model.js';
import Asset from './model.js';

const pump = util.promisify(pipeline);

export const create = async (req, res) => {
  try {
    const parts = req.parts({ limits: { fileSize: 50000000 } });
    for await (const part of parts) {
      if (part.type === 'file') {
        await pump(part.file, fs.createWriteStream(`public/${part.filename}`));
      } else {
        console.log(part);
      }
    }

    // const { name, category } = req.body;

    // const newItem = new Asset({ name, slug: slug(name), category });
    // const item = await newItem.save();

    // const ctgry = await Category.findById(category);
    // ctgry.asset.push(item._id);
    // await ctgry.save();

    // res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    const category = await Category.findById(asset.category);
    await category.asset.pull(req.params.id);
    await category.save();

    await Asset.findByIdAndDelete(req.params.id);

    res.status(200).send(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }
};
