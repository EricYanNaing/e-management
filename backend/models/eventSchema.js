const { model, Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    ga_quantity: {
      type: String,
      required: true,
    },
    ga_price: {
      type: String,
      required: true,
    },
    vip_quantity: {
      type: String,
      required: true,
    },
    vip_price: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const eventModel = model("Event", eventSchema);
module.exports = eventModel;
