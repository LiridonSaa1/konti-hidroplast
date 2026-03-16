export interface ContactEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  sourcePage?: string;
}

/**
 * Sends a contact email via an external form/email service.
 * The endpoint URL must be configured in the VITE_CONTACT_EMAIL_ENDPOINT env variable.
 * This runs in the browser; choose a provider that supports public form endpoints (e.g. Formspree).
 */
export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ ok: boolean }> {
  const endpoint = import.meta.env.VITE_CONTACT_EMAIL_ENDPOINT as string | undefined;

  if (!endpoint) {
    // Fail silently with ok=false so UI can optionally show a soft warning
    console.warn(
      "[contactEmail] VITE_CONTACT_EMAIL_ENDPOINT is not set. Skipping external email send."
    );
    return { ok: false };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        "[contactEmail] External email service responded with non-OK status:",
        response.status
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("[contactEmail] Failed to send contact email:", error);
    return { ok: false };
  }
}

