import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  id: string;
  name: string;
  hitDie: number;
  primaryAbility: string;
  saves: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClassSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hitDie: { type: Number, required: true },
  primaryAbility: { type: String, required: true },
  saves: [{ type: String }],
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IClass>('Class', ClassSchema);