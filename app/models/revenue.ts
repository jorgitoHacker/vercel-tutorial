import mongoose, { Schema, model } from "mongoose";
export interface IRevenue extends mongoose.Document {
  month: string;
  revenue: number;
}

const revenueSchema = new Schema<IRevenue>({
  month: {
    type: Schema.Types.String,
    unique: true,
    required: [true, "El mes es requerido"],
  },

  revenue: {
    type: Schema.Types.Number,
    required: [true, "El ingreso es requerido"],
  },
});

const modelo =
  mongoose.models?.Revenue || model<IRevenue>("Revenue", revenueSchema);
export default modelo;
