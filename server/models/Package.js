import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PackageSchema = new Schema(
  {
    // TODO write the Schema
    recipient: { type: String, required: true },
    address: { type: String, required: true },
    priority: { type: String, enum: ['BASIC', 'FIRST-CLASS', 'EXPRESS'], uppercase: true, default: 'BASIC' },
    weight: { type: Number, min: -10, max: 10000 },
    delivered: { type: Boolean, default: false },
    shipId: { type: Schema.Types.ObjectId, ref: 'Ships' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PackageSchema.virtual('ship', {
  localField: 'shipId',
  foreignField: '_id',
  ref: 'Ships',
  justOne: true
})
