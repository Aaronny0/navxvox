"use server";

export async function submitContact(formData: FormData) {
  // Honeypot check
  if (formData.get("website")) {
    throw new Error("Spam détecté");
  }

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    projectType: formData.get("projectType") as string,
    message: formData.get("message") as string,
  };

  // Server-side validation
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    throw new Error("Champs obligatoires manquants");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("Email invalide");
  }

  // Simulate email sending (log for now)
  console.log("📧 Nouveau message de contact :", data);

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
