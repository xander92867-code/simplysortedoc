import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export function ConsultationBooking({ children }: { children: React.ReactNode }) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-reservation-checkout", {
        body: {
          name,
          email,
          phone,
          notes,
          date: format(date, "yyyy-MM-dd"),
          time,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display',serif] text-2xl">
            Book a Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Select a date and time that works best for you. During the consultation, we will discuss your space and show you the container options available.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Select a Date *
            </Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < today}
              className="rounded-md border pointer-events-auto mx-auto"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" /> Select a Time *
            </Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Full Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Phone *</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Additional Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about the space you'd like organized..."
              rows={3}
            />
          </div>

          {/* Card Info Notice */}
          <div className="bg-secondary/50 border border-border rounded-sm p-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">
              💳 Secure Payment via Stripe
            </p>
            <p>
              You'll be redirected to Stripe's secure checkout to place a <strong className="text-foreground">$15 hold</strong> on your card.
            </p>
            <p>
              • This hold is <strong className="text-foreground">only charged</strong> as a cancellation fee if you cancel without <strong className="text-foreground">48 hours'</strong> notice.
            </p>
            <p>
              • We may request photos of the space prior to your appointment to better prepare for your session.
            </p>
            <p>
              • Feel free to message us on any platform if you have questions or need to make changes.
            </p>
            <p>
              • During the consultation, we will walk you through container options and help you choose the best solutions for your space.
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold"
          >
            {loading ? "Redirecting to payment..." : "Continue to Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
