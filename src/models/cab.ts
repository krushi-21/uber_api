import mongoose, { Schema, model } from 'mongoose';

const CabSchema = new Schema(
  {
    loc: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      address: String,
      coordinates: [Number],
    },

    booked: {
      type: Boolean,
      default: false,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      unique: true,
    },
  },
  { timestamps: true }
);
CabSchema.index({ location: '2d' });
export default model('Cab', CabSchema);
