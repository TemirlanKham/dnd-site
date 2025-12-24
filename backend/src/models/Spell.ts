import mongoose, { Schema, Document } from 'mongoose';

export interface ISpell extends Document {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const SpellSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  components: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  classes: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model<ISpell>('Spell', SpellSchema);