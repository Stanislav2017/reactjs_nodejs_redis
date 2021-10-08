const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    emailConfirmationLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
