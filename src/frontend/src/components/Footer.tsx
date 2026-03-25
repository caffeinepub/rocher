import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const shopLinks = [
  { label: "All Products", href: "/" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Men's", href: "/#collections" },
  { label: "Women's", href: "/#collections" },
  { label: "Sale", href: "/" },
];
const companyLinks = [
  { label: "Our Story", href: "/" },
  { label: "Journal", href: "/" },
  { label: "Sustainability", href: "/" },
  { label: "Careers", href: "/" },
];
const helpLinks = [
  { label: "Contact", href: "/" },
  { label: "Shipping", href: "/" },
  { label: "Returns", href: "/" },
  { label: "Size Guide", href: "/" },
];

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "rocher.com";

  return (
    <footer className="bg-rocher-charcoal text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <p className="font-display font-extrabold text-3xl tracking-rocher uppercase mb-3">
              ROCHER
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Performance gear engineered for those who refuse to settle.
              Precision crafted. Built to endure.
            </p>
            <a
              href="https://www.instagram.com/official_rocher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              data-ocid="footer.link"
              aria-label="Follow Rocher on Instagram"
            >
              <InstagramIcon size={18} />
              <span className="text-sm tracking-wide">@official_rocher</span>
            </a>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-nav mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-nav mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-nav mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-nav mb-1">
                Stay in the Game
              </h4>
              <p className="text-white/60 text-sm">
                New drops, exclusive offers, and training tips — straight to
                your inbox.
              </p>
            </div>
            {subscribed ? (
              <p
                className="text-sm font-semibold uppercase tracking-nav text-white/80"
                data-ocid="footer.success_state"
              >
                Thanks for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-0 w-full md:w-auto md:min-w-[380px]"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/40 flex-1"
                  data-ocid="footer.input"
                />
                <Button
                  type="submit"
                  className="rounded-none bg-white text-rocher-dark uppercase tracking-nav text-xs font-bold px-6 hover:bg-white/90 transition-colors"
                  data-ocid="footer.submit_button"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} ROCHER. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/official_rocher"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Instagram"
              data-ocid="footer.link"
            >
              <InstagramIcon size={15} />
              <span className="text-xs">official_rocher</span>
            </a>
            <p className="text-white/30 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
