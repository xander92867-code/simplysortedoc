import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useReservationConfirmation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => {
    const status = searchParams.get("reservation");
    const sessionId = searchParams.get("session_id");

    if (status === "success" && sessionId && !confirmed) {
      setConfirmed(true);
      // Confirm reservation and trigger admin email
      supabase.functions
        .invoke("confirm-reservation", { body: { session_id: sessionId } })
        .then(({ data, error }) => {
          if (error) {
            console.error("Confirmation error:", error);
            toast.error("Payment received but there was an issue confirming. We'll be in touch!");
          } else {
            toast.success(
              "Consultation booked! You'll receive a confirmation shortly. Thank you!",
              { duration: 8000 }
            );

            // Generate ICS file for calendar
            if (data?.reservation) {
              const r = data.reservation;
              generateIcs(r.date, r.time);
            }
          }
        });

      // Clean URL params
      searchParams.delete("reservation");
      searchParams.delete("session_id");
      setSearchParams(searchParams, { replace: true });
    } else if (status === "cancelled") {
      toast.info("Reservation cancelled. You can try again anytime.");
      searchParams.delete("reservation");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, confirmed, setSearchParams]);
}

function generateIcs(dateStr: string, timeStr: string) {
  const [timePart, meridiem] = timeStr.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let hour24 = hours;
  if (meridiem === "PM" && hours !== 12) hour24 += 12;
  if (meridiem === "AM" && hours === 12) hour24 = 0;

  const [year, month, day] = dateStr.split("-").map(Number);
  const startDate = new Date(year, month - 1, day, hour24, minutes, 0);
  const endDate = new Date(startDate);
  endDate.setHours(hour24 + 1);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
    `DTSTART:${fmt(startDate)}`, `DTEND:${fmt(endDate)}`,
    "SUMMARY:Simply Sorted OC - Consultation",
    "DESCRIPTION:Home organizing consultation with Simply Sorted OC.",
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Consultation tomorrow", "END:VALARM",
    "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:Consultation in 2 hours", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "simply-sorted-consultation.ics";
  a.click();
  URL.revokeObjectURL(url);
}
