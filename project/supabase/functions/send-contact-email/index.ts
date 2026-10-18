import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const recipient = "saibhagavanphani108@gmail.com";
const websiteName = "Vasavi Web Works";
const maxLengths = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  service: 80,
  budget: 80,
  message: 5000,
} as const;

const allowedServices = new Set([
  "Web Development",
  "UI/UX Design",
  "E-Commerce",
  "SEO Optimization",
  "Responsive Design",
  "Performance Tuning",
  "Other / Not Sure",
]);

const allowedBudgets = new Set([
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
]);

type ContactPayload = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
};

function cleanText(value: unknown, field: keyof typeof maxLengths, required = false): string | null {
  if (value === null || value === undefined || value === "") {
    if (required) throw new Error(`Missing ${field}`);
    return null;
  }
  if (typeof value !== "string") throw new Error(`Invalid ${field}`);
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, " ").trim();
  if (required && !cleaned) throw new Error(`Missing ${field}`);
  if (cleaned.length > maxLengths[field]) throw new Error(`Invalid ${field}`);
  return cleaned || null;
}

function escapeHtml(value: string | null): string {
  if (!value) return "—";
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character] ?? character));
}

function validatePayload(input: unknown): ContactPayload {
  if (!input || typeof input !== "object") throw new Error("Invalid request");
  const data = input as Record<string, unknown>;
  const name = cleanText(data.name, "name", true) as string;
  const email = cleanText(data.email, "email", true) as string;
  const message = cleanText(data.message, "message", true) as string;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
    throw new Error("Invalid email");
  }

  const phone = cleanText(data.phone, "phone");
  const company = cleanText(data.company, "company");
  const service = cleanText(data.service, "service");
  const budget = cleanText(data.budget, "budget");

  if (service && !allowedServices.has(service)) throw new Error("Invalid service");
  if (budget && !allowedBudgets.has(budget)) throw new Error("Invalid budget");

  return { name, email, phone, company, service, budget, message };
}

function makeEmailHtml(payload: ContactPayload, submittedAt: string): string {
  const fields = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Company", payload.company],
    ["Service Needed", payload.service],
    ["Budget Range", payload.budget],
    ["Project Details", payload.message],
    ["Submitted At", submittedAt],
  ];

  return `<div style="font-family:Arial,sans-serif;color:#171613;line-height:1.6;max-width:640px">
    <h2 style="color:#B65D3A">New Form Submission — ${websiteName}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${fields.map(([label, value]) => `<tr><td style="border:1px solid #DED8CD;padding:10px;font-weight:bold;vertical-align:top;width:34%">${label}</td><td style="border:1px solid #DED8CD;padding:10px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}
    </table>
  </div>`;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = validatePayload(await request.json());
    const submittedAt = new Date().toISOString();

    const { error: databaseError } = await supabase.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      service: payload.service,
      budget: payload.budget,
      message: payload.message,
    });

    if (databaseError) {
      console.error("Contact submission database insert failed", databaseError);
      return new Response(JSON.stringify({ error: "Could not save your message" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromAddress = Deno.env.get("RESEND_FROM_EMAIL") ?? "Vasavi Web Works <onboarding@resend.dev>";
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: payload.email,
        subject: `New Form Submission — ${websiteName}`,
        html: makeEmailHtml(payload, submittedAt),
      }),
    });

    if (!resendResponse.ok) {
      const errorDetails = await resendResponse.text();
      console.error("Resend email delivery failed", resendResponse.status, errorDetails);
      return new Response(JSON.stringify({ error: "Could not send your message" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact email function failed", error);
    return new Response(JSON.stringify({ error: "Please check your details and try again" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
