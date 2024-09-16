import dbConnect from "@/app/lib/dbConnect";
import Revenue from "../../models/revenue";

export async function getRevenues() {
  await dbConnect();
  const res = await Revenue.find({}).lean();
  return res;
}
export async function getCourseById(id: string) {
  await dbConnect();
  const res = await Revenue.findById(id).lean();
  return res;
}
