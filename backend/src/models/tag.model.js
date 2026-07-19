import mongoose , { Schema } from "mongoose"

const tagSchema = new Schema({
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  tagName : {
    type: String,
    required: true,
    trim: true,
  }
})

export const Tag = mongoose.model("Tag", tagSchema);