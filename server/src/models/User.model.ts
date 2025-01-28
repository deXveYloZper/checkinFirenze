// server/src/models/User.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'owner' | 'agent';
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'agent'], required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
