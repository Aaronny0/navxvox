import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

const PUBLIC_CLIENT_PATHS = [
  "/client/login",
  "/client/register",
  "/client/forgot-password",
  "/client/reset-password",
  "/client/verify",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/client") && !pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isClientRoute = pathname.startsWith("/client");
  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicClientPath = PUBLIC_CLIENT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const isAdminLogin = pathname === "/admin/login";

  // La connexion administrateur doit rester accessible même lorsqu'une
  // session client est active. Une connexion réussie remplacera cette session.
  if (isAdminLogin) {
    return NextResponse.next();
  }

  const token = request.cookies.get("novavox_session")?.value;

  if (!token) {
    if (isClientRoute && isPublicClientPath) return NextResponse.next();
    if (isClientRoute) return NextResponse.redirect(new URL("/client/login", request.url));
    if (isAdminRoute) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const session = await verifyJWT(token!);

  if (!session || session.expiresAt < Date.now()) {
    const response = isClientRoute && isPublicClientPath
      ? NextResponse.next()
      : NextResponse.redirect(
          new URL(isClientRoute ? "/client/login" : "/admin/login", request.url)
        );

    response.cookies.delete("novavox_session");
    return response;
  }

  if (isClientRoute && isPublicClientPath) {
    return NextResponse.redirect(
      new URL(session.role === "CLIENT" ? "/client/dashboard" : "/admin/dashboard", request.url)
    );
  }

  if (isAdminRoute && session.role === "CLIENT") {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  if (isClientRoute && session.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", session.userId);
  requestHeaders.set("x-user-email", session.email);
  requestHeaders.set("x-user-role", session.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};
