import dbConnect from "../lib/dbConnect";
import { customers, invoices, revenue, users } from "../lib/placeholder-data";
import Revenue from "../models/revenue";
import User from "../models/user";
import Invoice from "../models/invoice";
import Customer from "../models/customer";

async function seedUsers() {
  await dbConnect();
  await User.deleteMany();
  const res = await User.insertMany(users);
  return res;
}

async function seedRevenue() {
  await dbConnect();
  await Revenue.deleteMany();
  const res = await Revenue.insertMany(revenue);
  return res;
}

async function seedCustomers() {
  await dbConnect();
  await Customer.deleteMany();
  const res = await Customer.insertMany(customers);
  return res;
}

async function seedInvoices() {
  await dbConnect();
  await Invoice.deleteMany();
  const res = await Invoice.insertMany(invoices);
  return res;
}

export async function GET() {
  try {
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
