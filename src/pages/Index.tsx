import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram } from "lucide-react";
import { ConsultationBooking } from "@/components/ConsultationBooking";
import logo from "@/assets/logo.jpeg";

const services = [
  { title: "Residential Spaces", description: "Expertly organized kitchens, pantries, bedrooms, closets, bathrooms, and laundry rooms tailored to your lifestyle." },
  { title: "Unpacking & Setup", description: "Move into your new home stress-free. We unpack and create intuitive systems from day one." },
  { title: "Storage Solutions", description: "Clear out the clutter in your garage or storage unit with accessible, neat, and lasting layouts." },
];

const pricing = [
  { space: "Kitchen", noContainers: "$100", withContainers: "$120 – $150" },
  { space: "Bedroom", noContainers: "$75", withContainers: "$110" },
  { space: "Closets", noContainers: "$60", withContainers: "$110" },
  { space: "Bathroom", noContainers: "$80", withContainers: "$140" },
  { space: "Garage", noContainers: "$150", withContainers: "$200" },
  { space: "Laundry Room", noContainers: "$40", withContainers: "$60 – $90" },
  { space: "Storage Units", noContainers: "$200", withContainers: "$300" },
];

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-3 flex items-center justify-center gap-8">
        <a href="#" className="absolute left-5">
          <img src={logo} alt="Simply Sorted OC" className="h-10 w-auto" />
        </a>
        {["Services", "Pricing", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-muted-foreground font-semibold text-xs uppercase tracking-[2px] hover:text-foreground transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Hero */}
      <header className="py-28 md:py-36 text-center bg-secondary/20">
        <div className="max-w-3xl mx-auto px-6">
          <img src={logo} alt="Simply Sorted OC - Organizing Services" className="h-[28rem] md:h-[36rem] w-auto mx-auto mb-6" />
          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-foreground mb-3">
            Simply Sorted OC
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground italic mb-10 font-light">
            "A clean place for everyone"
          </p>
          <ConsultationBooking>
            <Button size="lg" className="rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold">
              Book a Consultation
            </Button>
          </ConsultationBooking>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs uppercase tracking-[4px] text-muted-foreground text-center mb-3 font-semibold">What We Do</p>
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-center mb-4 text-foreground">
          Professional Services
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
          We bring order and calm to every corner of your home — from kitchens and closets to garages and storage units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="border border-border p-8 md:p-10 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 bg-background"
            >
              <h3 className="font-semibold text-foreground mb-3 text-lg">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-24 mx-auto border-t border-border" />

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[4px] text-muted-foreground text-center mb-3 font-semibold">Investment</p>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-center mb-4 text-foreground">
            Transparent Pricing
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-lg mx-auto">
            All rates are starting prices and may vary based on project scope, complexity, and the level of detail required.
          </p>

          {/* Pricing Tier Explanations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            <div className="border border-border p-6 bg-background">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-2">No Containers</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A streamlined organizing method using items already available in your home. We work with what you have to create a cleaner, more functional space.
              </p>
            </div>
            <div className="border border-border p-6 bg-background">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-2">With Containers</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We present a curated selection of organizing containers for you to choose from. We then purchase and install them on your behalf — the additional cost covers the containers themselves.
              </p>
            </div>
          </div>

          <div className="border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="uppercase text-[11px] tracking-widest font-semibold text-foreground/70">Living Space</TableHead>
                  <TableHead className="uppercase text-[11px] tracking-widest font-semibold text-foreground/70">No Containers</TableHead>
                  <TableHead className="uppercase text-[11px] tracking-widest font-semibold text-foreground/70">With Containers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricing.map((row) => (
                  <TableRow key={row.space}>
                    <TableCell className="font-medium text-foreground">{row.space}</TableCell>
                    <TableCell className="text-muted-foreground">{row.noContainers}</TableCell>
                    <TableCell className="text-muted-foreground">{row.withContainers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Consultation Note */}
          <div className="mt-8 text-center bg-secondary/30 border border-border p-6">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              During your consultation, we will walk you through the available container options and help you select the best solutions for your space and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[hsl(var(--footer-bg))] text-primary-foreground py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl mb-3 text-primary-foreground">
            Start Your Transformation
          </h2>
          <p className="text-primary-foreground/50 mb-10">
            Let's create a home that feels as good as it looks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-sm">
            <a href="tel:7146543793" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Phone className="h-4 w-4" /> (714) 654-3793
            </a>
            <a href="mailto:simplysortedoc@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Mail className="h-4 w-4" /> simplysortedoc@gmail.com
            </a>
            <span className="flex items-center gap-2 text-primary-foreground/80">
              <Instagram className="h-4 w-4" /> @SimplySortedOC
            </span>
          </div>

          <ConsultationBooking>
            <Button variant="outline" size="lg" className="rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground mb-10">
              Book a Consultation
            </Button>
          </ConsultationBooking>

          <div className="border-t border-primary-foreground/10 pt-8">
            <p className="text-xs text-primary-foreground/30">
              &copy; 2026 Simply Sorted OC. Proudly serving Orange County, CA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
