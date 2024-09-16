import mongoose from "mongoose";
declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI =
  process.env.MONGODB_URI! || "mongodb://localhost:27017/test";

if (!MONGODB_URI) {
  throw new Error(
    "Por favor defina la variable MONGODB_URI dentro de .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((mongoose: any) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

