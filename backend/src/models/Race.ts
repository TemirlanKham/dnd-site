import mongoose, { Schema, Document } from 'mongoose';

export interface IRace extends Document {
  id: string;
  name: string;
  speed: number;
  size: string;
  abilityBonus: string;
  traits: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RaceSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  speed: { type: Number, required: true },
  size: { type: String, required: true },
  abilityBonus: { type: String, required: true },
  traits: [{ type: String }],
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IRace>('Race', RaceSchema);