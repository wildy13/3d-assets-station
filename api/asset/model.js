import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new Schema({
  _id: { type: String, default: () => nanoid(12) },
  name: String,
  slug: String,
  category: { type: String, ref: 'Category' },
}, { timestamps: true });

export default model('Asset', schema, 'asset');
