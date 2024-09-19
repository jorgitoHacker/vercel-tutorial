import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
       fetchInvoiceById(id),
       fetchCustomers(),
     ]);

  const costumersObj: {id: string; name: string}[] = customers.map((customer) => ({
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
      {costumersObj}
      <EditInvoiceForm /> 
    </main>
  );
}
