const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookedEvents: [
      {
        eventId: { type: Schema.Types.ObjectId, ref: "Event" },
        ticketType: { type: String, enum: ["GA", "VIP"] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", UserSchema);
module.exports = userModel;
