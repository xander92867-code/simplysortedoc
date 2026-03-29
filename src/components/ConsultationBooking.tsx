import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success(
      `Consultation reserved for ${format(date, "MMMM d, yyyy")} at ${time}. We will be in touch shortly!`
    );
    setOpen(false);
    setDate(undefined);
    setTime(undefined);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
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
              disabled={(d) => d < today || d.getDay() === 0}
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

          {/* Important Notices */}
          <div className="bg-secondary/50 border border-border rounded-sm p-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">
              Please Note
            </p>
            <p>
              • A <strong className="text-foreground">$15 cancellation fee</strong> applies if not notified at least <strong className="text-foreground">48 hours</strong> in advance.
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

          <Button type="submit" className="w-full rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold">
            Confirm Reservation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
