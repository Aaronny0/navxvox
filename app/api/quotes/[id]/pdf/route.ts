import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateQuotePDF } from "@/lib/pdf";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      project: {
        include: { client: true }
      },
      lines: true
    }
  });

  if (!quote) return new NextResponse("Not Found", { status: 404 });

  if (session.role === "CLIENT" && quote.project.clientId !== session.userId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Flatten for DocumentData type
  const docData = {
    ...quote,
    client: quote.project.client
  };

  try {
    const stream = await generateQuotePDF(docData as any);
    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Devis_${quote.number}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
