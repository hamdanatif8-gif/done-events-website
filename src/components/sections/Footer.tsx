import { Hexagon } from 'lucide-react';
import { navLinks, primaryCta } from '../../content/navigation';

export function Footer() {
  return (
    <footer className="relative z-[var(--z-page)] border-t border-white/10 bg-[var(--nova-black)]">
      <div className="nova-shell">
        <div className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <a href="#home" className="flex items-center gap-2.5 text-white" aria-label="NovaAI — home">
            <Hexagon aria-hidden="true" className="size-[18px] text-white/80" strokeWidth={1.4} />
            <span className="text-[1rem] font-medium lowercase leading-none tracking-[-0.02em]">
              novaai
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-[44px] items-center text-[0.86rem] text-white/58 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={primaryCta.href}
            className="inline-flex min-h-[44px] items-center self-start rounded-[var(--r-pill)] border border-[var(--nova-line)] px-5 text-[0.74rem] font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:bg-white/[0.07] hover:text-white lg:self-auto"
          >
            {primaryCta.label}
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-white/38">Clear. Precise. Automated.</p>
          <p className="text-[0.8rem] text-white/32">
            © {new Date().getFullYear()} NovaAI
          </p>
        </div>
      </div>
    </footer>
  );
}
