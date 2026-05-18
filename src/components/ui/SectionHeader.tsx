'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { viewportOnce, fadeInUp, staggerContainer } from '@/lib/motion';

/**
 * Reusable section header with label, heading, and optional description.
 * Consistently styled across all page sections.
 */
interface SectionHeaderProps {
  label?: string;
  heading: string;
  headingAccent?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  label,
  heading,
  headingAccent,
  description,
  align = 'center',
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'mb-12 md:mb-16 lg:mb-20',
        align === 'center' && 'text-center',
        className
      )}
    >
      {/* Label */}
      {label && (
        <motion.span
          variants={fadeInUp}
          className="section-label block mb-4"
          style={{ color: dark ? '#8FA38A' : undefined }}
        >
          {label}
        </motion.span>
      )}

      {/* Divider */}
      <motion.div
        variants={fadeInUp}
        className={cn('section-divider mb-6', align === 'left' && 'mx-0')}
        style={{
          background: dark
            ? 'linear-gradient(90deg, transparent, #DDB7AF, transparent)'
            : undefined,
        }}
      />

      {/* Heading */}
      <motion.h2
        variants={fadeInUp}
        className="font-heading"
        style={{
          fontSize: 'var(--text-4xl)',
          color: dark ? '#F8F4F1' : 'var(--color-charcoal)',
        }}
      >
        {heading}
        {headingAccent && (
          <>
            {' '}
            <span
              className="font-heading-light"
              style={{ color: 'var(--color-rose)' }}
            >
              {headingAccent}
            </span>
          </>
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 max-w-xl leading-relaxed"
          style={{
            fontSize: 'var(--text-base)',
            color: dark ? 'rgba(248,244,241,0.55)' : 'var(--color-warm-gray)',
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
