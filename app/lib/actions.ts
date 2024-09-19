"use server";

import { z } from "zod";
import Invoice from "../models/invoice";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await dbConnect();
  await Invoice.insertMany({
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
  });
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await dbConnect();
  await Invoice.findByIdAndUpdate(
    id,
    { customer_id: customerId, amount: amountInCents, status },
    { new: true }
  );

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}


export async function deleteInvoice(id: string) {
  await Invoice.deleteOne({ _id: id });
  revalidatePath("/dashboard/invoices");
}
