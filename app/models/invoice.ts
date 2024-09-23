import mongoose, { Schema, model } from "mongoose";
export interface IInvoice extends mongoose.Document {
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
  date: Date;
}

const InvoiceSchema = new Schema<IInvoice>({
  customer_id: {
    type: Schema.Types.String,
    required: [true, "El id es requerido"],
  },

  amount: {
    type: Schema.Types.Number,
    required: [true, "La cantidad es requerido"],
  },

  status: {
    type: Schema.Types.String,
    required: [true, "El correo es requerido"],
  },

  date: {
    type: Schema.Types.Date,
    required: [true, "La contraseña es requerida"],
  },
});

const modelo =
  mongoose.models?.Invoice || model<IInvoice>("Invoice", InvoiceSchema);
export default modelo;
