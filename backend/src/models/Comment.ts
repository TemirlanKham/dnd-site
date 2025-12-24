import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  contentType: 'spell' | 'class' | 'race';
  contentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contentType: { type: String, enum: ['spell', 'class', 'race'], required: true },
  contentId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
export default mongoose.model('Comment', CommentSchema);