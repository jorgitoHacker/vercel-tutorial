import mongoose, { Schema, model } from "mongoose";
export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
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

  password: {
    type: Schema.Types.String,
    required: [true, "La contraseña es requerida"],
  },
});

const modelo = mongoose.models?.User || model<IUser>("User", UserSchema);
export default modelo;
