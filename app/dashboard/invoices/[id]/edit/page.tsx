import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { TInvoice } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }
  const customersObj: { id: string; name: string }[] = customers.map(
    (customer) => ({
      id: customer._id.toString(),
      name: customer.name,
    })
  );
  const invoiceObj: TInvoice = {
    id: invoice._id.toString(),
    customer_id: invoice.customer_id,
    amount: invoice.amount,
    status: invoice.status,
  };
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
      <EditInvoiceForm invoice={invoiceObj} customers={customersObj} />
    </main>
  );
}
