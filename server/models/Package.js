import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PackageSchema = new Schema(
  {
    // TODO write the Schema
    recipient: { type: String, required: true },
    address: { type: String, required: true },
    priority: { type: String, enum: ['BASIC', 'FIRST-CLASS', 'EXPRESS'], uppercase: true, default: 'BASIC' },
    weight: { type: Number, min: -10, max: 10000 },
    delivered: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
