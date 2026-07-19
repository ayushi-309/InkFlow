import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120, // 2 minutes
    },
  },
  { timestamps: true },
);

export const Otp = mongoose.model("Otp", otpSchema);
