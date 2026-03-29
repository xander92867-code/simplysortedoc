import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram } from "lucide-react";
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
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-center gap-8">
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
          <p className="text-xs uppercase tracking-[4px] text-muted-foreground mb-6 font-semibold">
            Professional Home Organizing
          </p>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-7xl mb-4 text-foreground leading-tight">
            Simply Sorted OC
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground italic mb-10 font-light">
            "A clean place for everyone"
          </p>
          <Button asChild size="lg" className="rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold">
            <a href="#contact">Book a Consultation</a>
          </Button>
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
          <p className="text-center text-muted-foreground text-sm mb-10 max-w-lg mx-auto">
            All rates are starting prices and may vary based on project scope, complexity, and the level of detail required.
          </p>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm">
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
