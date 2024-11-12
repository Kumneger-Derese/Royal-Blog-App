import { model, Schema } from 'mongoose';

const emailSchema = new Schema(
  {
    subscribtionEmail: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const EmailModel = model('Email', emailSchema);
export default EmailModel;
