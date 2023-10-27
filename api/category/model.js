import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new Schema({
  _id: { type: String, default: () => nanoid(12) },
  name: String,
  slug: String,
  asset: [{ type: String, ref: 'Asset' }],
}, { timestamps: true });

export default model('Category', schema, 'category');
