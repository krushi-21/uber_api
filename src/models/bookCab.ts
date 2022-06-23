import mongoose, { Schema, model } from 'mongoose';

const CabBookingSchema = new Schema(
  {
    pickupAddress: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      address: String,
      coordinates: [Number],
    },
    dropAddress: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      address: String,
      coordinates: [Number],
    },
    tripPrice: {
      type: Number,
    },
    bookingConfirm: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cab',
    },
  },
  { timestamps: true }
);
CabBookingSchema.pre(/^find/, async function (next) {
  (await this.populate('User')).populate({
    path: 'Cab',
  });

  next();
});

CabBookingSchema.index({ pickupAddress: '2d', dropAddress: '2d' });
export default model('CabBooking', CabBookingSchema);
