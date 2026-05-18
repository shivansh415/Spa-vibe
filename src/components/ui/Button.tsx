'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { ease } from '@/lib/motion';

/**
 * Premium button component with multiple style variants.
 */
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'rose' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const sizeMap = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3 text-[12px]',
  lg: 'px-9 py-4 text-[13px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  target,
  className,
  icon,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'font-[family-name:var(--font-poppins)] font-medium',
    'tracking-[0.1em] uppercase rounded-full',
    'transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'disabled:opacity-40 disabled:pointer-events-none',
    sizeMap[size],
    className
  );

  const variantClasses = {
    primary: 'bg-charcoal text-linen hover:bg-deep-brown hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-transparent text-charcoal border border-charcoal/20 hover:bg-charcoal hover:text-linen hover:-translate-y-0.5',
    rose: 'bg-rose text-charcoal hover:bg-blush hover:shadow-[0_0_40px_rgba(221,183,175,0.2)] hover:-translate-y-0.5',
    ghost: 'bg-transparent text-charcoal px-0 py-1 rounded-none tracking-[0.14em] relative',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-lg hover:-translate-y-0.5',
  };

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={cn(baseClasses, variantClasses[variant])}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: ease.smooth }}
      >
        {content}
        {variant === 'ghost' && (
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal scale-x-0 origin-right transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:origin-left" />
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], 'group')}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: ease.smooth }}
    >
      {content}
      {variant === 'ghost' && (
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal scale-x-0 origin-right transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:origin-left" />
      )}
    </motion.button>
  );
}
