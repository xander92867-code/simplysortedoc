import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return new Response(
        JSON.stringify({ error: "Missing session_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update reservation to confirmed
    const { data: reservation, error: updateError } = await supabaseAdmin
      .from("reservations")
      .update({ status: "confirmed" })
      .eq("stripe_session_id", session_id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating reservation:", updateError);
      throw new Error("Failed to confirm reservation");
    }

    // Send admin notification email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && reservation) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Simply Sorted OC <onboarding@resend.dev>",
            to: ["simplysortedoc@gmail.com"],
            subject: `New Consultation Booking — ${reservation.date} at ${reservation.time}`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="font-size: 24px; color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
                  New Consultation Booked
                </h1>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${reservation.name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${reservation.phone}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${reservation.email || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: bold;">${reservation.date}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Time</td><td style="padding: 8px 0; font-weight: bold;">${reservation.time}</td></tr>
                  ${reservation.notes ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Notes</td><td style="padding: 8px 0;">${reservation.notes}</td></tr>` : ""}
                </table>
                <p style="margin-top: 24px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px; color: #666;">
                  Payment of $15 hold confirmed via Stripe. Session: ${session_id}
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Resend error:", await emailResponse.text());
        }
      } catch (emailErr) {
        console.error("Failed to send email notification:", emailErr);
      }
    }

    return new Response(JSON.stringify({ reservation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
