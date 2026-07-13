import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "novavox-super-secret-jwt-key-change-in-production-min-32-chars"
);

const COOKIE_NAME = "novavox_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export interface SessionPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  role: string;
  expiresAt: number;
}

// ─── JWT ────────────────────────────────────────────────────────────────────

export async function signJWT(payload: Omit<SessionPayload, "expiresAt">): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  return new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// ─── Session (cookie) ────────────────────────────────────────────────────────

export async function createSession(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  role: string;
}): Promise<void> {
  const token = await signJWT({
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION / 1000, // seconds
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── Password ────────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Email (mock) ────────────────────────────────────────────────────────────

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const verifyUrl = `${appUrl}/client/verify?token=${token}`;

  if (process.env.RESEND_API_KEY) {
    // TODO: Integrate Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: "noreply@novavox.fr", to: email, subject: "Vérifiez votre email", html: `...` });
    console.log("📧 [RESEND] Verification email would be sent to:", email);
  } else {
    console.log("\n" + "=".repeat(60));
    console.log("📧 EMAIL DE VÉRIFICATION (DEV MODE)");
    console.log("=".repeat(60));
    console.log(`À: ${email}`);
    console.log(`Lien: ${verifyUrl}`);
    console.log("=".repeat(60) + "\n");
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const resetUrl = `${appUrl}/client/reset-password?token=${token}`;

  console.log("\n" + "=".repeat(60));
  console.log("📧 EMAIL RESET MOT DE PASSE (DEV MODE)");
  console.log("=".repeat(60));
  console.log(`À: ${email}`);
  console.log(`Lien: ${resetUrl}`);
  console.log("=".repeat(60) + "\n");
}
