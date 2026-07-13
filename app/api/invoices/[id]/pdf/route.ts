import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateInvoicePDF } from "@/lib/pdf";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  
  const invoice = await db.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      lines: true
    }
  });

  if (!invoice) return new NextResponse("Not Found", { status: 404 });

  if (session.role === "CLIENT" && invoice.clientId !== session.userId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const stream = await generateInvoicePDF(invoice as any);
    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Facture_${invoice.number}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
