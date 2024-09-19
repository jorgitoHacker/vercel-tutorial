import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
       fetchInvoiceById(id),
       fetchCustomers(),
     ]);

  const customersObj: {id: string; name: string}[] = customers.map((customer) => ({
       id: customer._id.toString(),
       name: customer.name,
  }));
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {invoice.amount}
      {invoice.status}
      {invoice._id || " No tiene _id "}
      {invoice.id || " No tiene id "}
      {invoice.customer_id || " No tiene customer_id "}
      <EditInvoiceForm customers={customersObj} /> 
    </main>
  );
}
