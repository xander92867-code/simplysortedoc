import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const services = [
  { title: "Residential Spaces", description: "Expertly organized kitchens, pantries, bedrooms, and closets tailored to your lifestyle." },
  { title: "Unpacking & Setup", description: "Move into your new home stress-free. We unpack and create systems from day one." },
  { title: "Storage Solutions", description: "Clear out the clutter in your garage or storage unit with accessible, neat layouts." },
];

const pricing = [
  { space: "Kitchen", noContainers: "$100", withContainers: "$120 - $150" },
  { space: "Bedroom", noContainers: "$75", withContainers: "$110" },
  { space: "Closets", noContainers: "$60", withContainers: "$110" },
  { space: "Bathroom", noContainers: "$80", withContainers: "$140" },
  { space: "Garage", noContainers: "$150", withContainers: "$200" },
  { space: "Laundry Room", noContainers: "$40", withContainers: "$60 - $90" },
  { space: "Storage Units", noContainers: "$200", withContainers: "$300" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border px-5 py-5 text-center">
        <a href="#services" className="mx-4 text-muted-foreground font-semibold text-sm uppercase tracking-widest hover:text-foreground transition-colors">
          Services
        </a>
        <a href="#pricing" className="mx-4 text-muted-foreground font-semibold text-sm uppercase tracking-widest hover:text-foreground transition-colors">
          Pricing
        </a>
        <a href="#contact" className="mx-4 text-muted-foreground font-semibold text-sm uppercase tracking-widest hover:text-foreground transition-colors">
          Contact
        </a>
      </nav>

      {/* Hero */}
      <header className="bg-secondary/30 py-24 md:py-28 text-center border-b-4 border-muted">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-6xl mb-3 text-foreground">
            Simply Sorted OC
          </h1>
          <p className="text-lg text-muted-foreground italic mb-8">
            "A clean place for everyone"
          </p>
          <Button asChild className="rounded-sm px-8 py-6 text-base font-semibold">
            <a href="#contact">Book a Consultation</a>
          </Button>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-5 py-20">
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-center mb-12 text-foreground">
          Professional Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="border border-border p-10 text-center hover:-translate-y-1 hover:border-muted-foreground/40 transition-all duration-300"
            >
              <h3 className="font-semibold text-foreground mb-4">{s.title}</h3>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-secondary/50 py-20">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-center mb-4 text-foreground">
            Transparent Pricing
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            *All rates are starting prices and may vary based on project scale and detail.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase text-xs tracking-widest">Living Space</TableHead>
                <TableHead className="uppercase text-xs tracking-widest">No Containers</TableHead>
                <TableHead className="uppercase text-xs tracking-widest">With Containers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((row) => (
                <TableRow key={row.space}>
                  <TableCell className="font-medium">{row.space}</TableCell>
                  <TableCell>{row.noContainers}</TableCell>
                  <TableCell>{row.withContainers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[hsl(var(--footer-bg))] text-primary-foreground py-20 text-center">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl mb-5 text-primary-foreground">
            Start Your Transformation
          </h2>
          <div className="mb-10 text-lg space-y-2">
            <p><strong>Call or Text:</strong> (714) 654-3793</p>
            <p><strong>Email:</strong> simplysortedoc@gmail.com</p>
          </div>
          <p className="font-semibold text-primary-foreground/60 uppercase text-xs tracking-[3px]">
            Follow us @SimplySortedOC
          </p>
          <p className="mt-10 text-xs text-primary-foreground/30">
            &copy; 2026 Simply Sorted OC. Serving Orange County, CA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
