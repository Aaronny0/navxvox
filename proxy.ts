import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

const PUBLIC_CLIENT_PATHS = [
  "/client/login",
  "/client/register",
  "/client/forgot-password",
  "/client/reset-password",
  "/client/verify",
];

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /client/* and /admin/* routes
  if (!pathname.startsWith("/client") && !pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("novavox_session")?.value;
  const isClientRoute = pathname.startsWith("/client");
  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicClientPath = PUBLIC_CLIENT_PATHS.some((p) => pathname.startsWith(p));
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));

  // No token
  if (!token) {
    if (isClientRoute && isPublicClientPath) return NextResponse.next();
    if (isAdminRoute && isPublicAdminPath) return NextResponse.next();

    if (isClientRoute) return NextResponse.redirect(new URL("/client/login", request.url));
    if (isAdminRoute) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify token
  const session = await verifyJWT(token!);

  if (!session || session.expiresAt < Date.now()) {
    // Expired / invalid
    let response: NextResponse;
    if (isClientRoute && isPublicClientPath) response = NextResponse.next();
    else if (isAdminRoute && isPublicAdminPath) response = NextResponse.next();
    else if (isClientRoute) response = NextResponse.redirect(new URL("/client/login", request.url));
    else response = NextResponse.redirect(new URL("/admin/login", request.url));

    response.cookies.delete("novavox_session");
    return response;
  }

  // Handle active session redirection for auth pages
  if (isClientRoute && isPublicClientPath) {
    if (session.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  if (isAdminRoute && isPublicAdminPath) {
    if (session.role === "CLIENT") {
      return NextResponse.redirect(new URL("/client/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect admin routes from clients
  if (isAdminRoute && session.role === "CLIENT") {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  // Protect client routes from admins (optional, but good practice)
  if (isClientRoute && session.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Inject user info into headers for Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", session.userId);
  requestHeaders.set("x-user-email", session.email);
  requestHeaders.set("x-user-role", session.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};