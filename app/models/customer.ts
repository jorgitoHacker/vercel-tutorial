import mongoose, { Schema, model } from "mongoose";
export interface ICustomer extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  image_url?: string;
}

const CustomerSchema = new Schema<ICustomer>({
  id: {
    type: Schema.Types.String,
    unique: true,
    required: [true, "El id es requerido"],
  },

  name: {
    type: Schema.Types.String,
    required: [true, "El nombre es requerido"],
  },

  email: {
    type: Schema.Types.String,
    required: [true, "El correo es requerido"],
  },

  image_url: {
    type: Schema.Types.String,
  },
});

const modelo =
  mongoose.models?.Customer || model<ICustomer>("Customer", CustomerSchema);
export default modelo;
