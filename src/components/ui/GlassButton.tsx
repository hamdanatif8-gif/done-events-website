import { ArrowUpRight } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'strong' | 'subtle' | 'quiet';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Renders the trailing arrow that shifts on hover. */
  arrow?: boolean;
}

interface LinkProps extends CommonProps {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
}

interface ActionProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

type GlassButtonProps = LinkProps | ActionProps;

const base =
  'group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-[var(--r-pill)] ' +
  'px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white ' +
  'transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-quiet)] ' +
  'active:scale-[0.985] cursor-pointer';

const variants: Record<Variant, string> = {
  strong: 'glass-strong glass-sheen hover:bg-white/[0.17]',
  subtle: 'glass hover:bg-white/[0.1]',
  quiet:
    'border border-transparent bg-transparent text-white/72 hover:text-white hover:border-[var(--nova-line)]',
};

/** The page's only button. Text never moves; only the arrow and surface react. */
export function GlassButton(props: GlassButtonProps) {
  const { children, variant = 'subtle', className = '', arrow = true } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-[1.05em] shrink-0 transition-transform duration-300 ease-[var(--ease-quiet)] group-hover:translate-x-[4px] group-hover:-translate-y-[4px]"
          strokeWidth={1.6}
        />
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, onClick } = props;
    return (
      <a href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  const { children: _children, variant: _variant, className: _className, arrow: _arrow, href: _href, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
